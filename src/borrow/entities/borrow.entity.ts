import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, member => member.borrows)
  member: Member;

  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @Column({ type: 'date' })
  borrow_date: Date;

  @Column({ type: 'date', nullable: true })
  return_date: Date;

  @Column({ default: false })
  is_returned: boolean;
}
