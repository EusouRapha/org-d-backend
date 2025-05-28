import { ApiProperty } from '@nestjs/swagger';

export class GetClientResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The client ID',
  })
  client_id: number;

  @ApiProperty({
    example: 'Maria da Silva',
    description: 'The client full name',
  })
  name: string;

  @ApiProperty({
    example: '231.321.231-12',
    description: 'The client CPF',
  })
  cpf: string;

  @ApiProperty({
    example: '(31) 98745-7845',
    description: 'The client phone number',
  })
  phone_number: string;
}
