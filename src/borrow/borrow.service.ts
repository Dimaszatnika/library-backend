import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './entities/borrow.entity';
import { Member } from '../member/entities/member.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async borrowBook(memberId: number, bookId: number): Promise<string> {
    const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['borrows'] });
    const book = await this.bookRepository.findOne({ where: { id: bookId }, relations: ['borrows'] });

    if (!member) return 'Member not found';
    if (!book) return 'Book not found';
    
    // Check if member is penalized
    if (member.is_penalized) return `Member is penalized until ${member.penalty_end_date}`;
    
    // Check if member already borrowed 2 books
    const borrowedBooksCount = member.borrows.filter(borrow => !borrow.is_returned).length;
    if (borrowedBooksCount >= 2) return 'Member already borrowed 2 books';

    // Check if the book is already borrowed by someone else
    const isBookBorrowed = book.borrows.some(borrow => !borrow.is_returned);
    if (isBookBorrowed) return 'Book is already borrowed by another member';

    // Check if the book is available
    if (book.stock < 1) return 'Book is not available';

    // Reduce the stock
    book.stock -= 1;
    await this.bookRepository.save(book);

    // Create new borrow record
    const borrow = new Borrow();
    borrow.member = member;
    borrow.book = book;
    borrow.borrow_date = new Date();
    await this.borrowRepository.save(borrow);

    return `Book borrowed successfully by ${member.name}`;
  }

  async returnBook(memberId: number, bookId: number): Promise<string> {
    const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['borrows'] });
    const book = await this.bookRepository.findOne({ where: { id: bookId }, relations: ['borrows'] });

    if (!member) return 'Member not found';
    if (!book) return 'Book not found';

    // Find the borrow record
    const borrowRecord = member.borrows.find(borrow => borrow.book.id === book.id && !borrow.is_returned);
    if (!borrowRecord) return 'Member did not borrow this book';

    // Mark the book as returned
    borrowRecord.is_returned = true;
    borrowRecord.return_date = new Date();
    
    // Check if the book is returned after 7 days
    const borrowDuration = (new Date().getTime() - new Date(borrowRecord.borrow_date).getTime()) / (1000 * 3600 * 24);
    if (borrowDuration > 7) {
      // Penalize the member for 3 days
      member.is_penalized = true;
      const penaltyEndDate = new Date();
      penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
      member.penalty_end_date = penaltyEndDate;
      await this.memberRepository.save(member);
    }

    // Increase the stock
    book.stock += 1;
    await this.bookRepository.save(book);

    await this.borrowRepository.save(borrowRecord);
    return `Book returned successfully by ${member.name}`;
  }

  async checkAvailableBooks(): Promise<Book[]> {
    return this.bookRepository.find({
      where: { borrows: { is_returned: true } },
    });
  }

  async checkMembers(): Promise<Member[]> {
    return this.memberRepository.find({ relations: ['borrows'] });
  }
}
