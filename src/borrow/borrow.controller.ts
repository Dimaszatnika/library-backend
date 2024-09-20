import { Controller, Post, Body, Param } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('borrow')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post(':memberId/borrow/:bookId')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiResponse({ status: 200, description: 'Book borrowed successfully' })
  @ApiResponse({ status: 404, description: 'Member or book not found' })
  @ApiResponse({ status: 400, description: 'Cannot borrow book due to rules' })
  borrowBook(@Param('memberId') memberId: number, @Param('bookId') bookId: number) {
    return this.borrowService.borrowBook(memberId, bookId);
  }

  @Post(':memberId/return/:bookId')
  @ApiOperation({ summary: 'Return a book' })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  @ApiResponse({ status: 404, description: 'Member or book not found' })
  @ApiResponse({ status: 400, description: 'Book was not borrowed by this member' })
  returnBook(@Param('memberId') memberId: number, @Param('bookId') bookId: number) {
    return this.borrowService.returnBook(memberId, bookId);
  }
}
