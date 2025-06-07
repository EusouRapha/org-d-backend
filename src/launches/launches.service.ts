import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaunchRequestDto } from './dto/create-launch-request.dto';
import { UpdateLaunchRequestDto } from './dto/update-launch-request.dto';
import { Launch, LaunchType } from './entities/launch.entity';
import { GenericResponseType } from '../generic-types.type';
import { Account } from '../accounts/entities/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { GetLaunchResponseDto } from './dto/get-launch-response.dto';

@Injectable()
export class LaunchesService {
  constructor(
    @InjectRepository(Launch)
    private readonly launchesRepository: Repository<Launch>,

    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,

    private readonly accountsService: AccountsService,
  ) {}

  async create(body: CreateLaunchRequestDto): Promise<GenericResponseType> {
    try {
      if (!body.value || !body.type || !body.account_number) {
        throw new BadRequestException();
      }
      const account = await this.accountsService.findOne(body.account_number);

      if (!account) {
        throw new BadRequestException('Invalid account ID');
      }

      const newLaunch: Launch = this.launchesRepository.create({
        value: body.value,
        type: body.type,
        operation: body.operation,
        generated_at: new Date(),
        account: account,
      });

      await this.launchesRepository.save(newLaunch);

      const newValue =
        body.type === LaunchType.CREDIT
          ? account.balance + body.value
          : account.balance - body.value;

      await this.accountsService.update(account.id, { value: newValue });

      return {
        statusCode: HttpStatus.OK,
        message: 'Launch created successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? error.message : error,
      };
    }
  }

  async findAllByAccountId(
    account_id: number,
  ): Promise<GetLaunchResponseDto[]> {
    const launches = await this.launchesRepository.find({
      where: { account: { id: account_id } },
    });

    const response = launches.map((launch) => {
      return {
        value: launch.value,
        type: launch.type,
        generated_at: launch.generated_at,
      } as GetLaunchResponseDto;
    });
    return response;
  }

  async findOne(id: number): Promise<Launch> {
    return await this.launchesRepository.findOne({
      where: { id: Number(id) },
      relations: ['account'],
    });
  }

  async update(
    id: number,
    body: UpdateLaunchRequestDto,
  ): Promise<GenericResponseType> {
    try {
      if (!id || !Object.keys(body).length) {
        throw new BadRequestException();
      }

      const foundLaunch: Launch = await this.launchesRepository.findOne({
        where: { id: id },
        relations: ['account'],
      });

      if (!foundLaunch) {
        throw new BadRequestException('Launch not found');
      }

      if (body.account_number) {
        const account = await this.accountsRepository.findOneBy({
          id: Number(body.account_number),
        });
        if (!account) {
          throw new BadRequestException('Invalid account ID');
        }
        foundLaunch.account = account;
      }

      const updatedLaunch: Launch = {
        ...foundLaunch,
        ...body,
      };

      await this.launchesRepository.save(updatedLaunch);

      return {
        statusCode: HttpStatus.OK,
        message: 'Launch updated successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? error.message : error,
      };
    }
  }
}
