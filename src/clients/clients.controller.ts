import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientsService as ClientService } from './clients.service';
import { CreateClientRequestDto as CreateClientRequestDto } from './dto/create-client.dto';
import { UpdateClientRequestDto } from './dto/update-client.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientsService: ClientService) {}

  @Post()
  create(@Body() body: CreateClientRequestDto) {
    return this.clientsService.create(body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: number) {
    return this.clientsService.findOne(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: number,
    @Body() body: UpdateClientRequestDto,
  ) {
    return this.clientsService.update(id, body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: number) {
    return this.clientsService.hardDelete(id);
  }
}
