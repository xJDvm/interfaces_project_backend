import { Controller, Get, Param, Put, Post, Body, Delete, Query } from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) { }
  // @Get(':categoryId/products/:productId')
  // getCategory(@Param() { categoryId, productId }) {
  //   return `Product ${productId}, Category ${categoryId}`;
  // }
  @Get()
  getCategories(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.categoriesService.findAll();
  }

  @Get('filter')
  getCategoryById(@Query('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
