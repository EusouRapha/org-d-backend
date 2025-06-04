import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LaunchType } from '../entities/launch.entity';

export class GetLaunchResponseDto {
  @ApiProperty({
    example: 150.75,
    description: 'The value of the launch',
  })
  value: number;

  @ApiProperty({
    example: 'CREDIT',
    description: 'The type of the launch',
  })
  type: LaunchType;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the launch was generated',
  })
  generated_at: Date;
}
