import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateAccountRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 150.75,
    description: 'The value of the launch',
  })
  value: number;
}
