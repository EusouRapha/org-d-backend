import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    example: 'raphael@email.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty()
  password: string;
}
