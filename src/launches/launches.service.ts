import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaunchRequestDto } from './dto/create-launch-request.dto';
import { UpdateLaunchRequestDto } from './dto/update-launch-request.dto';
import { Launch } from './entities/launch.entity';
import { GenericResponseType } from '../generic-types.type';
import { Account } from '../accounts/entities/account.entity';

@Injectable()
export class LaunchesService {
  constructor(
    @InjectRepository(Launch)
    private readonly launchesRepository: Repository<Launch>,

    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async create(body: CreateLaunchRequestDto): Promise<GenericResponseType> {
    try {
      if (!body.value || !body.type || !body.account_id) {
        throw new BadRequestException();
      }

      const account = await this.accountsRepository.findOneBy({
        id: Number(body.account_id),
      });

      if (!account) {
        throw new BadRequestException('Invalid account ID');
      }

      const newLaunch: Launch = this.launchesRepository.create({
        value: body.value,
        type: body.type,
        account: account,
      });

      await this.launchesRepository.save(newLaunch);

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

  async findAll(): Promise<Launch[]> {
    return await this.launchesRepository.find({
      relations: ['account'],
    });
  }

  async findOne(id: string): Promise<Launch> {
    return await this.launchesRepository.findOne({
      where: { id: Number(id) },
      relations: ['account'],
    });
  }

  async update(
    id: string,
    body: UpdateLaunchRequestDto,
  ): Promise<GenericResponseType> {
    try {
      if (!id || !Object.keys(body).length) {
        throw new BadRequestException();
      }

      const foundLaunch: Launch = await this.launchesRepository.findOne({
        where: { id: Number(id) },
        relations: ['account'],
      });

      if (!foundLaunch) {
        throw new BadRequestException('Launch not found');
      }

      if (body.account_id) {
        const account = await this.accountsRepository.findOneBy({
          id: Number(body.account_id),
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

  async hardDelete(id: number): Promise<GenericResponseType> {
    try {
      const foundLaunch: Launch = await this.launchesRepository.findOneBy({
        id: id,
      });

      if (!foundLaunch) {
        throw new BadRequestException('Launch not found');
      }

      await this.launchesRepository.delete(foundLaunch);

      return {
        statusCode: HttpStatus.OK,
        message: 'Launch deleted successfully',
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
