import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<AccountDto[]> {
    const accounts = await this.accountsRepository.find({ relations: ['client'] });
    return accounts.map(account => new AccountDto(account));
  }

  async findOne(id: number): Promise<AccountDto> {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!account) {
      throw new Error('Account not found');
    }
    return new AccountDto(account);
  }
  create(createAccountDto: CreateAccountDto) {
    return 'This action adds a new account';
  }
  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
