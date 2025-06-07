import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAccountRequestDto {
  @IsNotEmpty()
  client_id?: number;


  @ApiProperty({
    example: 150.75,
    description: 'The value of the launch',
  })
  value?: number;

  @ApiProperty({
    example: 150.75,
    description: 'The value of the new limit',
  })
  limit?: number;
}
