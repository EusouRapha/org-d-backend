import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { LaunchOperation, LaunchType } from '../entities/launch.entity';

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

  @IsEnum(LaunchOperation)
  @ApiProperty({
    example: 'DEPOSIT',
    enum: LaunchOperation,
    description: 'The operation type of the launch',
  })
  operation: LaunchOperation;

  @ApiProperty({
    example: 'JQ-1212122',
    description: 'The account ID related to this launch',
  })
  account_number: string;
}
