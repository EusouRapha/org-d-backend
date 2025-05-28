import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { LaunchType } from '../entities/launch.entity';

export class CreateLaunchRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 150.75,
    description: 'The value of the launch',
  })
  value: number;

  @IsEnum(LaunchType)
  @ApiProperty({
    example: 'CREDIT',
    enum: LaunchType,
    description: 'The type of the launch',
  })
  type: LaunchType;

  @ApiProperty({
    example: 'JQ-1212122',
    description: 'The account ID related to this launch',
  })
  account_number: string;
}
