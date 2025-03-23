import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponseType } from '../generic-types.type';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserRequestDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(body: CreateUserRequestDto): Promise<GenericResponseType> {
    try {
      const newUser = this.usersRepository.create({
        name: body.name.trim(),
        password: bcryptHashSync(body.password, 10),
        last_name: body.last_name.trim(),
        email: body.email.trim(),
      });
      await this.usersRepository.save(newUser);

      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to create user', error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch users', error.message);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: email.trim() });
    if (!user) {
      throw new BadRequestException('User with the given email not found');
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new BadRequestException('User with the given ID not found');
    }
    return user;
  }

  async update(
    id: string,
    body: UpdateUserRequestDto,
  ): Promise<GenericResponseType> {
    const foundUser: User = await this.usersRepository.findOneBy({
      user_id: id,
    });

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    const updatedUser: User = {
      ...foundUser,
      ...body,
    };

    try {
      await this.usersRepository.save(updatedUser);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to update user', error.message);
    }
  }

  async hardDelete(id: string): Promise<GenericResponseType> {
    const foundUser: User = await this.usersRepository.findOneBy({
      user_id: id,
    });

    if (!foundUser) {
      throw new BadRequestException('User not found');
    }

    try {
      await this.usersRepository.delete(foundUser);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete user', error.message);
    }
  }
}
