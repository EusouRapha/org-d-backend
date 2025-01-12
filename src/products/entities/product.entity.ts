import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { StringDecoder } from 'string_decoder';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  price: number;

  @Column({
    type: Date,
  })
  created_at: Date;

  @Column({
    type: Date,
  })
  created_by: Date;

  @Column({
    type: Boolean,
  })
  is_enabled: boolean;

  @Column({
    type: String,
  })
  image_url: string;

  @Column({
    type: String,
  })
  product_url: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
