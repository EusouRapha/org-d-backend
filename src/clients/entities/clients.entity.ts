import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, unique: true })
  cpf: string;

  @Column({ length: 20 })
  phone_number: string;

  @OneToMany(() => Account, account => account.client)
  accounts: Account[];
}