import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

export class CategoriesRepository extends Repository<Category> {}
