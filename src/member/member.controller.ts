import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Post()
  create(@Body() memberData: Member): Promise<Member> {
    return this.memberService.create(memberData);
  }
}
