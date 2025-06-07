import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountRequestDto } from './dto/update-account.dto';

@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts in the system' })
  @ApiResponse({ status: 200, description: 'List of all accounts retrieved successfully.' })
  findAllAccounts() {
    return this.accountsService.findAllAccounts();
  }

  @Get('clients/:client_id')
  @ApiOperation({ summary: 'Get all accounts for a specific client' })
  @ApiResponse({ status: 200, description: 'List of accounts retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  findAllByClientId(
    @Param('client_id') client_id: number,
    @Query('details', ParseBoolPipe) details?: boolean,
  ) {
    return this.accountsService.findAllByClientId(+client_id, !!details);
  }

  @Get(':account_number')
  @ApiOperation({ summary: 'Get account details by account number' })
  @ApiResponse({ status: 200, description: 'Account details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  findOneByNumber(@Param('account_number') account_number: string) {
    return this.accountsService.findOne(account_number);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an account by ID' })
  @ApiResponse({ status: 200, description: 'Account updated successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id') id: number,
    @Body() updateAccountDto: UpdateAccountRequestDto,
  ) {
    return this.accountsService.update(+id, updateAccountDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete an account by ID' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Account not found.' })
  remove(@Param('id') id: number) {
    return this.accountsService.remove(+id);
  }
}
