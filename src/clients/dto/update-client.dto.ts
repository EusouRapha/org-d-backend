import { PartialType } from '@nestjs/swagger';
import { CreateClientRequestDto } from './create-client.dto';

export class UpdateClientRequestDto extends PartialType(CreateClientRequestDto) {}
