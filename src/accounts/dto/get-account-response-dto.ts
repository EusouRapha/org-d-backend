import { ApiProperty } from '@nestjs/swagger';

export class GetAccountLaunchResponseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the launch',
  })
  id: number;

  @ApiProperty({
    example: 150.75,
    description: 'The value of the launch',
  })
  value: number;

  @ApiProperty({
    example: 'credit',
    description: 'The type of the launch (e.g., credit, debit)',
  })
  type: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date when the launch was generated',
  })
  date: Date;
}

export class GetAccountResponseDto {
  @ApiProperty({
    example: '1234567890',
    description: 'The account number',
  })
  account_number: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the client associated with the account',
  })
  id: number;

  @ApiProperty({
    example: 1000.5,
    description: 'The current balance of the account',
  })
  balance: number;

  @ApiProperty({
    type: [GetAccountLaunchResponseDto],
    description: 'The list of launches associated with the account',
  })
  launches?: GetAccountLaunchResponseDto[];
}
