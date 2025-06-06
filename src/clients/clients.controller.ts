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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { ClientsService as ClientService } from './clients.service';
import { CreateClientRequestDto } from './dto/create-client.dto';
import { UpdateClientRequestDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientsService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() body: CreateClientRequestDto) {
    return this.clientsService.create(body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'List of clients retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiResponse({ status: 200, description: 'Client retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientsService.findOneById(id);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a client by ID' })
  @ApiResponse({ status: 200, description: 'Client updated successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  update(
    @Param('id') id: number,
    @Body() body: UpdateClientRequestDto,
  ) {
    return this.clientsService.update(id, body);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a client by ID' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientsService.hardDelete(id);
  }
}
