import { Product } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id?: string;

  @Column({ type: String })
  name: string;

  @Column({ type: Date })
  created_at: Date;

  @Column({ type: Date })
  updated_at: Date;

  @Column({ type: Boolean })
  is_enabled: boolean;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
