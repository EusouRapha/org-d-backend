import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Raphael',
    description: 'The name of the user',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Gomes',
    description: 'The last_name of the user',
  })
  last_name: string;

  @IsEmail()
  @ApiProperty({
    example: 'raphael@email.com',
    description: 'The email of the user',
  })
  email: string;
  
}
