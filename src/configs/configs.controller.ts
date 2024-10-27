import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ConfigService } from './configs.service';
import { CreateConfigDto } from './create-configs.dto';
import { Config } from './config.entity';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':userId')
  async findConfigByUserId(@Param('userId') userId: number): Promise<Config> {
    return this.configService.findConfigByUserId(userId);
  }

  @Post()
  async create(@Body() createConfigDto: CreateConfigDto): Promise<Config> {
    return this.configService.create(createConfigDto);
  }
}
