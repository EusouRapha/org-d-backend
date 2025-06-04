import { Repository } from 'typeorm';
import { Client } from './entities/clients.entity';

export class ClientsRepository extends Repository<Client> {}
