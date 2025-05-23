import { PartialType } from '@nestjs/swagger';
import { CreateLaunchRequestDto } from './create-launch-request.dto';

export class UpdateLaunchRequestDto extends PartialType(
  CreateLaunchRequestDto,
) {}
