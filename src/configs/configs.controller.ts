import { Controller, Post, Body } from '@nestjs/common';
import { ConfigService } from './configs.service';
import { CreateConfigDto } from './create-configs.dto';
import { Config } from './config.entity';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  async create(@Body() createConfigDto: CreateConfigDto): Promise<Config> {
    return this.configService.create(createConfigDto);
  }
}
