import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryRequestDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;
}
