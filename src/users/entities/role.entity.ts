import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  constructor(role_id: string) {
    this.role_id = role_id;
  }
  @PrimaryColumn({ type: 'varchar' })
  role_id?: string;

  @Column({ type: String })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
