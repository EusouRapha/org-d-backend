import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';

export class AccountDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the account',
  })
  id: number;

  @ApiProperty({
    example: '123456',
    description: 'The account number',
  })
  number: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'The CPF of the client associated with the account',
  })
  cpf: string;
}