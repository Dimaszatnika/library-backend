import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'The code of the book', example: 'JK-45', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'The title of the book', example: 'Harry Potter', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The author of the book', example: 'J.K Rowling', required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ description: 'The stock quantity of the book', example: 1, required: false })
  @IsOptional()
  @IsInt()
  stock?: number;
}