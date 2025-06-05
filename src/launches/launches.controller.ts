import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
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
  create(@Body() body: CreateLaunchRequestDto) {
    return this.launchesService.create(body);
  }

  @Get('accounts/:account_id')
  findAllByAccountId(@Param('account_id') account_id: number) {
    return this.launchesService.findAllByAccountId(account_id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.launchesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateLaunchRequestDto,
  ) {
    return this.launchesService.update(id, body);
  }

}
