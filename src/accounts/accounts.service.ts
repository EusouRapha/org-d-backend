import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async findAll(client_id: number) {
    const accounts = await this.accountsRepository.find({
      where: { client: { client_id: client_id } },
      relations: ['launches'],
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found for this client');
    }

    return accounts.map((account) => {
      if (account.launches.length === 0) {
        return {
          accountNumber: account.number,
          balance: 0,
        };
      }
      const totalCredit = account.launches
        .filter((launch) => launch.type === 'CREDIT')
        .reduce((sum, launch) => sum + Number(launch.value), 0);

      const totalDebit = account.launches
        .filter((launch) => launch.type === 'DEBIT')
        .reduce((sum, launch) => sum + Number(launch.value), 0);

      const balance = totalCredit - totalDebit;

      return {
        accountNumber: account.number,
        balance: balance,
      };
    });
  }

  async findOne(id: number) {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  }

  async create(body: CreateAccountDto) {
    const client = await this.clientsRepository.findOne({
      where: { client_id: body.client_id },
    });

    const accountNumber = `${client.name.slice(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newAccount = {
      number: accountNumber,
      client: client,
    };

    const account = this.accountsRepository.create(newAccount);
    return this.accountsRepository.save(account);
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
