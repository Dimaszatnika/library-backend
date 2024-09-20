import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrow } from '../../borrow/entities/borrow.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_penalized: boolean;

  @Column({ type: 'date', nullable: true })
  penalty_end_date: Date;

  @OneToMany(() => Borrow, borrow => borrow.member)
  borrows: Borrow[];
}
