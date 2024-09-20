import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @ApiProperty({ description: 'The code of the member', example: 'M001' })
    code: string;

    @ApiProperty({ description: 'The name of the member', example: 'John Doe' })
    name: string;

    @ApiProperty({ description: 'The penalized status of the member', example: false })
    is_penalized: boolean;
    
    @ApiProperty({ description: 'The end date of the penalty', example: '2024-01-01' })
    penalty_end_date: Date;
}