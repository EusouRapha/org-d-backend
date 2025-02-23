import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Raphael',
    description: 'The name of the user',
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    example: 'raphael@email.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
