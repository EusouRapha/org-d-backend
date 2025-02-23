import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  constructor(
    name: string,
    password: string,
    last_name: string,
    email: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.name = name;
    this.password = password;
    this.last_name = last_name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  @PrimaryGeneratedColumn('uuid')
  user_id?: string;

  @Column({type: String})
  password: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  last_name: string;

  @Column({ type: String })
  email: string;

  @Column({ type: Date })
  created_at: Date;

  @Column({ type: Date })
  updated_at: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
