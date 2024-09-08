import { Controller, Get, Query, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) { }

  @Get()
  getBrands(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  getBrandById(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.findOne(brandId);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }
}
