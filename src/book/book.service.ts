import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async availableBooks(): Promise<Book[]> {
    return this.bookRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.borrows', 'borrow', 'borrow.is_returned = false')
      .select('book.id', 'id')
      .addSelect('book.title', 'title')
      .addSelect('book.author', 'author')
      .addSelect('book.stock', 'stock')
      .addSelect('COUNT(borrow.id)', 'borrowed_count')
      .groupBy('book.id')
      .having('book.stock > borrowed_count')
      .getRawMany();
  }
}
