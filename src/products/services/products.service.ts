import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../products/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla bla',
      price: 130,
      stock: 100,
      image: 'foto',
    },
    {
      id: 69,
      name: 'Product 69',
      description: 'el producto 69, nice',
      price: 130,
      stock: 100,
      image: 'foto',
    }
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    } else {
      return product;
    }
  }

  create(payload: CreateProductDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    console.log(payload, id);
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload
      };
      return this.products[index];
    } else {
      return null;
    }
  }
  // delete(name: string): boolean {
  //   const index = this.products.findIndex((item) => item.name === name);
  //   if (index !== -1) {
  //     this.products.splice(index, 1);
  //     return true;
  //   }
  //   return false;
  // }
  deleteById(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
