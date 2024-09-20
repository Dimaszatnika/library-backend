import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
  @ApiProperty({ description: 'The borrow date', example: '2024-01-01' })
  borrow_date: Date;

  @ApiProperty({ description: 'The return date', example: '2024-01-01' })
  return_date: Date;

  @ApiProperty({ description: 'The status of the borrow', example: false })
  is_returned: boolean;

  @ApiProperty({ description: 'The member id', example: 1 })
  memberId: number;

  @ApiProperty({ description: 'The book id', example: 1 })
  bookId: number;
}