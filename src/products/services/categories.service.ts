import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Categories[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'bla bla bla',
      image: 'foto',
    },
    {
      id: 69,
      name: 'Category 69',
      description: 'el producto 69, nice',
      image: 'foto',
    }
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    } else {
      return category;
    }
  }

  create(payload: CreateCategoryDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((item) => item.id === id);
      this.categories[index] = {
        ...category,
        ...payload
      };
      return this.categories[index];
    } else {
      throw new NotFoundException(`Category #${id} not found`);
    }
  }
  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    } else {
      this.categories.splice(index, 1);
      return true;
    }
  }
}
