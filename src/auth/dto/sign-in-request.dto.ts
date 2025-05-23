import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Matches } from 'class-validator';

export class SignInRequestDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF must be in the format XXX.XXX.XXX-XX',
  })
  @ApiProperty({
    example: '231.321.231-12',
    description: 'CPF of the client',
  })
  cpf: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    example: '123456',
    description: 'Password of the client',
  })
  password: string;
}