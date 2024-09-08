import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../../products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      description: 'bla bla bla',
      location: 'location',
      image: 'foto',
    },
    {
      id: 69,
      name: 'Brand 69',
      description: 'el producto 69, nice',
      location: 'location',
      image: 'foto',
    }
  ]

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    } else {
      return brand;
    }
  }

  create(payload: CreateBrandDto) {
    const newBrand = {
      id: this.counterId,
      ...payload
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brand,
        ...payload
      };
      return this.brands[index];
    } else {
      throw new NotFoundException(`Brand #${id} not found`);
    }
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand #${id} not found`);
    } else {
      this.brands.splice(index, 1);
      return true;
    }
  }
}
