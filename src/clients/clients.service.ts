import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericResponseType } from '../generic-types.type';
import { CreateClientRequestDto } from './dto/create-client.dto';
import { UpdateClientRequestDto } from './dto/update-client.dto';
import { Client } from './entities/clients.entity';
import { ClientsRepository } from './clients.repository';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { GetClientResponseDto } from './dto/get-client-response-dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async create(body: CreateClientRequestDto): Promise<GenericResponseType> {
    try {
      const newClient = this.clientsRepository.create({
        name: body.name.trim(),
        cpf: body.cpf.trim(),
        phone_number: body.phone_number.trim(),
        password: bcryptHashSync(body.password, 10),
      });
      await this.clientsRepository.save(newClient);

      return {
        statusCode: HttpStatus.OK,
        message: 'Client created successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to create client', error.message);
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientsRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch clients', error.message);
    }
  }

  async findOneByCPF(cpf: string): Promise<Client> {
    const client = await this.clientsRepository.findOneBy({ cpf: cpf.trim() });
    if (!client) {
      throw new BadRequestException('Client with the given CPF not found');
    }
    return client;
  }

  async findOneById(id: number): Promise<GetClientResponseDto> {
    const client = await this.clientsRepository.findOneBy({ client_id: id });
    if (!client) {
      throw new BadRequestException('Client with the given ID not found');
    }
    const response: GetClientResponseDto = {
      client_id: client.client_id,
      name: client.name,
      cpf: client.cpf,
      phone_number: client.phone_number,
    };
    return response;
  }

  async update(
    id: number,
    body: UpdateClientRequestDto,
  ): Promise<GenericResponseType> {
    const foundClient: Client = await this.clientsRepository.findOneBy({
      client_id: id,
    });

    if (!foundClient) {
      throw new BadRequestException('Client not found');
    }

    const updatedClient: Client = {
      ...foundClient,
      ...body,
      cpf: body.cpf?.trim() || foundClient.cpf,
      phone_number: body.phone_number?.trim() || foundClient.phone_number,
      name: body.name?.trim() || foundClient.name,
    };

    try {
      await this.clientsRepository.save(updatedClient);
      return {
        statusCode: HttpStatus.OK,
        message: 'Client updated successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to update client', error.message);
    }
  }

  async hardDelete(id: number): Promise<GenericResponseType> {
  const foundClient: Client = await this.clientsRepository.findOne({
    where: { client_id: id },
    relations: ['accounts'],
  });
    if (!foundClient) {
      throw new BadRequestException('Client not found');
    }

    try {
      await this.clientsRepository.remove(foundClient);
      return {
        statusCode: HttpStatus.OK,
        message: 'Client deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException('Failed to delete client', error.message);
    }
  }
}
