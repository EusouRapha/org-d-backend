import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Client } from 'src/clients/entities/clients.entity';
import { Launch } from 'src/launches/entities/launch.entity';
// import { Launch } from './launch.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  number: string;

  @ManyToOne(() => Client, client => client.accounts, { eager: true })
  client: Client;

  @OneToMany(() => Launch, launch => launch.account)
  launches: Launch[];
}
