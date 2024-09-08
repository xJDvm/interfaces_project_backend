import {
  Controller, Get, Param, Query, Post, Body, Put, Delete,
  HttpStatus, HttpCode
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('name') name: string,
  ) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    let number = 5000.1;
    let formattedAmount = number.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return formattedAmount
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
    // return { message: `productico es ${productico}` }
    // return {
    //   message: `product ${productId}`,
    // }
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteById(id);
  }

}
