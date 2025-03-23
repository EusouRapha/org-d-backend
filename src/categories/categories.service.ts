import {
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryRequestDto } from './dto/create-category-request.dto';
import { UpdateCategoryRequestDto } from './dto/update-category-request.dto';
import { Category } from './entities/category.entity';
import { GenericResponseType } from '../generic-types.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(body: CreateCategoryRequestDto): Promise<GenericResponseType> {
    try {
      if (!body.name) {
        throw new BadRequestException();
      }
      const newCategory: Category = {
        name: body.name,
        created_at: new Date(),
        updated_at: new Date(),
        is_enabled: true,
      };
      await this.categoriesRepository.save(newCategory);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category created successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? 'Category name is required' : error,
      };
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoriesRepository.findOneBy({ category_id: id });
  }

  async update(
    id: string,
    body: UpdateCategoryRequestDto,
  ): Promise<GenericResponseType> {
    try {
      if (!id || !Object.keys(body).length) {
        throw new BadRequestException();
      }
      const foundCategory: Category = await this.categoriesRepository.findOneBy(
        {
          category_id: id,
        },
      );
      const updatedCategory: Category = {
        ...foundCategory,
        ...body,
      };
      await this.categoriesRepository.save(updatedCategory);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category updated successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest
          ? 'Category ID and at least one field to update is required'
          : error,
      };
    }
  }

  async hardDelete(id: string): Promise<GenericResponseType> {
    try {
      const foundCategory: Category = await this.categoriesRepository.findOneBy(
        {
          category_id: id,
        },
      );

      if (!foundCategory) {
        throw new BadRequestException();
      }

      await this.categoriesRepository.delete(foundCategory);

      return {
        statusCode: HttpStatus.OK,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      const isBadRequest = error instanceof BadRequestException;
      return {
        statusCode: isBadRequest
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation failed',
        error: isBadRequest ? 'Category not found' : error,
      };
    }
  }
}
