import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsService as ClientService } from './clients.service';
import { CreateClientRequestDto } from './dto/create-client.dto';
import { UpdateClientRequestDto } from './dto/update-client.dto';

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
  findOne(@Param('id') id: number) {
    return this.clientsService.findOneById(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateClientRequestDto,
  ) {
    return this.clientsService.update(id, body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientsService.hardDelete(id);
  }
}
