import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    example: '1',
    description: 'The client ID',
  })
  id: number;

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

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM4YzU4YzAtNjY4Mi00YzU0LWE4ZjctZmQ5ZjY2ZjU0NzU4IiwiaWF0IjoxNjE3MzI4NzUyLCJleHAiOjE2MTczMzIzNTJ9.1XJ1j3P3v3jC5m7ZpY5Z4X2Xt2Nj3Z6K1wWwR1Qx4zI',
    description: 'The JWT access token',
  })
  access_token: string;

  @ApiProperty({
    example: 3000,
    description: 'Token expiration time in seconds',
  })
  expiresIn: number;
}
