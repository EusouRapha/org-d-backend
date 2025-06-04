import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountRequestDto } from './dto/update-account.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get('clients/:client_id')
  findAllByClientId(
    @Param('client_id') client_id: number,
    @Query('details', ParseBoolPipe) details?: boolean,
  ) {
    return this.accountsService.findAllByClientId(+client_id, !!details);
  }

  @Get(':account_number')
  findOneByNumber(@Param('account_number') account_number: string) {
    return this.accountsService.findOne(account_number);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAccountDto: UpdateAccountRequestDto,
  ) {
    return this.accountsService.update(+id, updateAccountDto);
  }

}
