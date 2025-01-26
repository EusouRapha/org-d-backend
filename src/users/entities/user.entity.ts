
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id?: string;

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

  @ManyToOne(() => Role, role => role.users)
  role: Role;

}
