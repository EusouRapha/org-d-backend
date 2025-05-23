import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientRequestDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    example: 'Raphael',
    description: 'The name of the client',
  })
  name: string;
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    example: '123.456.789-00',
    description: 'The CPF of the client',
  })
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    example: '(31) 99999-9999',
    description: 'The phone number of the client',
  })
  phone_number: string;
}