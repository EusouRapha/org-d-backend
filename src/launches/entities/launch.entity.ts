import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Min } from 'class-validator';

export enum LaunchType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity('launches')
export class Launch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Min(0)
  value: number;

  @Column({
    type: 'enum',
    enum: LaunchType,
  })
  type: LaunchType;

  @Column(
    { type: 'timestamp'}
  )
  generated_at: Date;

  @ManyToOne(() => Account, account => account.launches, { eager: true, cascade: true, onDelete: 'CASCADE' })
  account: Account;
}
