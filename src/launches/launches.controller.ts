import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateLaunchRequestDto } from './dto/create-launch-request.dto';
import { UpdateLaunchRequestDto } from './dto/update-launch-request.dto';
import { LaunchesService } from './launches.service';

@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new launch' })
  @ApiResponse({ status: 201, description: 'Launch created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() body: CreateLaunchRequestDto) {
    return this.launchesService.create(body);
  }

  @Get('accounts/:account_id')
  @ApiOperation({ summary: 'Get all launches for a specific account' })
  @ApiResponse({ status: 200, description: 'List of launches retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  findAllByAccountId(@Param('account_id') account_id: number) {
    return this.launchesService.findAllByAccountId(account_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a launch by ID' })
  @ApiResponse({ status: 200, description: 'Launch retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Launch not found.' })
  findOne(@Param('id') id: number) {
    return this.launchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a launch by ID' })
  @ApiResponse({ status: 200, description: 'Launch updated successfully.' })
  @ApiResponse({ status: 404, description: 'Launch not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id') id: number,
    @Body() body: UpdateLaunchRequestDto,
  ) {
    return this.launchesService.update(id, body);
  }
}
