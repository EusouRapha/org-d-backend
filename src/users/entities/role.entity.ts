import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  constructor(role_id: string) {
    this.role_id = role_id;
  }
  @PrimaryGeneratedColumn('uuid')
  role_id?: string;

  @Column({ type: String })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
