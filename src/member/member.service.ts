import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  create(member: Member): Promise<Member> {
    return this.memberRepository.save(member);
  }

  async membersWithBorrowCount(): Promise<any[]> {
    return this.memberRepository.createQueryBuilder('member')
      .leftJoinAndSelect('member.borrows', 'borrow', 'borrow.is_returned = false')
      .select('member.id', 'id')
      .addSelect('member.name', 'name')
      .addSelect('COUNT(borrow.id)', 'borrow_count')
      .groupBy('member.id')
      .getRawMany();
  }
}
