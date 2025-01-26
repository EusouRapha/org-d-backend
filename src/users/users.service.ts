import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { GenericResponseType } from '../generic-types.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(body: CreateUserRequestDto): Promise<GenericResponseType> {
    try {
      if (!body.name || !body.last_name || !body.email) {
        throw new BadRequestException();
      }
      const newUser: User = {
        name: body.name,
        last_name: body.last_name,
        email: body.email,
        created_at: new Date(),
        updated_at: new Date(),
        role: new Role('commonId'),
      };
      await this.usersRepository.save(newUser);

      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? 'User fields are not populated' : error,
      };
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ user_id: id });
  }

  async update(
    id: string,
    body: UpdateUserRequestDto,
  ): Promise<GenericResponseType> {
    try {
      if (!id || !Object.keys(body).length) {
        throw new BadRequestException();
      }
      const foundUser: User = await this.usersRepository.findOneBy({
        user_id: id,
      });
      const updatedCategory: User = {
        ...foundUser,
        ...body,
      };
      await this.usersRepository.save(updatedCategory);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest
          ? 'Category ID and at least one field to update is required'
          : error,
      };
    }
  }

  async hardDelete(id: string): Promise<GenericResponseType> {
    try {
      const foundUser: User = await this.usersRepository.findOneBy({
        user_id: id,
      });

      if (!foundUser) {
        throw new BadRequestException();
      }

      await this.usersRepository.delete(foundUser);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? 'User not found' : error,
      };
    }
  }
}
