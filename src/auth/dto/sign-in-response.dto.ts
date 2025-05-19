import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {




  @ApiProperty({
    example: 'ee112743-8677-4b2a-9d3b-30da86dab468',
    description: 'The user id'
  })
  id:string

  @ApiProperty({
    example: 'email@email.com',
    description: 'The user email'
  })
  email:string

  @ApiProperty({
    example: 'John Doe',
    description: 'The user name'
  })
  username:string

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM4YzU4YzAtNjY4Mi00YzU0LWE4ZjctZmQ5ZjY2ZjU0NzU4IiwiaWF0IjoxNjE3MzI4NzUyLCJleHAiOjE2MTczMzIzNTJ9.1XJ1j3P3v3jC5m7ZpY5Z4X2Xt2Nj3Z6K1wWwR1Qx4zI',
    description: 'The JWT token',
  })
  access_token: string;

  @ApiProperty({
    example: 3000,
    description: 'The expiration time of the token in seconds',
  })
  expiresIn: number;
}
