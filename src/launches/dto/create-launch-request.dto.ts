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

  @IsUUID()
  @ApiProperty({
    example: 'c5b27d71-24d2-4ae8-b159-bd7643cd0dc7',
    description: 'The account ID related to this launch',
  })
  account_id: string;
}
