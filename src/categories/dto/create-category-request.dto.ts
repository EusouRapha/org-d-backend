import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;
}
