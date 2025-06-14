import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountRequestDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { ClientsService } from 'src/clients/clients.service';
import { GetAccountResponseDto } from './dto/get-account-response-dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Client)
    private readonly clientsService: ClientsService,
  ) { }

  async findAllAccounts(): Promise<GetAccountResponseDto[]> {
  const foundAccounts = await this.accountsRepository.find({ relations: ['client', 'launches'] });

  if( !foundAccounts || foundAccounts.length === 0) {
    throw new BadRequestException('No accounts found');
  }

  const results = foundAccounts.map((account) => {
      return {
        id: account.id,
        account_number: account.number,
        balance: account.balance,
        limit: account.limit,
        launches: [
          ...account.launches.map((launch) => ({
            id: launch.id,
            value: launch.value,
            type: launch.type,
            date: launch.generated_at,
          })),
        ],
      };
  }
  );
  return results;
}

  async findAllByClientId(
    client_id: number,
    details?: boolean,
  ): Promise<GetAccountResponseDto[]> {
    const accounts = await this.accountsRepository.find({
      where: { client: { client_id: client_id } },
      relations: ['launches'],
    });

    if (!accounts || accounts.length === 0) {
      return [];
    }

    if (!details) {
      return accounts.map((account) => ({
        id: account.id,
        account_number: account.number,
        balance: account.balance,
        limit: account.limit,
      }));
    }

    const result = accounts.map((account) => {
      return {
        id: account.id,
        account_number: account.number,
        balance: account.balance,
        limit: account.limit,
        launches: [
          ...account.launches.map((launch) => ({
            id: launch.id,
            value: launch.value,
            type: launch.type,
            operation: launch.operation,
            date: launch.generated_at,
          })),
        ],
      };
    });

    return result;
  }

  async findOne(account_number: string) {
    const account = await this.accountsRepository.findOne({
      where: { number: account_number },
      relations: ['client'],
    });

    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  async create(body: CreateAccountDto) {
    const client = await this.clientsService.findOneById(body.client_id);

    let account_number: string;
    let isUnique = false;

    while (!isUnique) {
      account_number = `${client.name.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const alreadyExists = await this.findAllByClientId(client.client_id);

      isUnique = !alreadyExists.some(
        (account) => account.account_number === account_number,
      );
    }

    const newAccount = {
      number: account_number,
      balance: 0,
      limit: 0,
      client: client,
    };

    const account = this.accountsRepository.create(newAccount);
    return this.accountsRepository.save(account);
  }

  async update(account_id: number, updateAccountDto: UpdateAccountRequestDto) {
    try {
      const account = await this.accountsRepository.findOne({
        where: { id: account_id },
        relations: ['client'],
      });
      if (!account) {
        throw new Error('Account not found');
      }

      if(updateAccountDto.client_id && updateAccountDto.client_id !== account.client.client_id) {
        throw new BadRequestException('Client ID does not match the account client');
      }

      const updatedAccount = {
        ...account,
        balance: updateAccountDto.value ?? account.balance,
        limit: updateAccountDto.limit ?? account.limit,
      };
      return await this.accountsRepository.save(updatedAccount);
    } catch (error) {
      throw new Error(`Error updating account: ${error.message}`);
    }
  }

  async remove(id: number) {
    const account = await this.accountsRepository.findOne({
      where: { id: id },
      relations: ['launches'],
    });

    if (!account) {
      throw new Error('Account not found');
    }

    try {
      await this.accountsRepository.remove(account);
      return {
        statusCode: HttpStatus.OK,
        message: 'Account deleted successfully',
      };

    } catch (error) {
      throw new BadRequestException('Failed to delete account', error.message);
    }

  }
}
