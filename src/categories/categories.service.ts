import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryRequestDto } from './dto/create-category-request.dto';
import { UpdateCategoryRequestDto } from './dto/update-category-request.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(body: CreateCategoryRequestDto): Promise<Category> {
    if (!body.name) {
      throw new BadRequestException('Category must have a name');
    }
    const newCategory: Category = {
      name: body.name,
      created_at: new Date(),
      updated_at: new Date(),
      is_enabled: true,
    };
    return await this.categoriesRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoriesRepository.findOneBy({ category_id: id });
  }

  async update(id: string, body: UpdateCategoryRequestDto): Promise<Category> {
    if (!id || !Object.keys(body).length) {
      throw new BadRequestException(
        'You must provide an id or anything to change on the category',
      );
    }
    const foundCategory: Category = await this.categoriesRepository.findOneBy({
      category_id: id,
    });
    const updatedCategory: Category = {
      ...foundCategory,
      ...body,
    };
    return await this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: string): Promise<Category> {
    const foundCategory: Category = await this.categoriesRepository.findOneBy({
      category_id: id,
    });

    const disabledCategory: Category = {
      ...foundCategory,
      is_enabled: false,
    };

    return await this.categoriesRepository.save(disabledCategory);
  }
}
