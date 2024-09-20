import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'The code of the book', example: 'JK-45' })
  code: string;

  @ApiProperty({ description: 'The title of the book', example: 'Harry Potter' })
  title: string;

  @ApiProperty({ description: 'The author of the book', example: 'J.K Rowling' })
  author: string;

  @ApiProperty({ description: 'The stock quantity of the book', example: 1 })
  stock: number;
}
