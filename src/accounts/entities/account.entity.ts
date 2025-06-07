import { Client } from 'src/clients/entities/clients.entity';
import { Launch } from 'src/launches/entities/launch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  number: string;

  @ManyToOne(() => Client, (client) => client.accounts, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column('float')
  balance: number;

  @Column('float', { default: 0 })
  limit: number;

  @OneToMany(() => Launch, (launch) => launch.account)
  launches: Launch[];
}
