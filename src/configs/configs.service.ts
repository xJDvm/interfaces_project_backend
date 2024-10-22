// configs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './config.entity';
import { Users } from '../users/entities/user.entity';
import { CreateConfigDto } from './create-configs.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findConfigByUserId(userId: number): Promise<Config | undefined> {
    return await this.configRepository.findOne({ where: { userId: userId } });
}

async create(createConfigDto: CreateConfigDto): Promise<Config> {
    let config = await this.findConfigByUserId(createConfigDto.userId);

    if (config) {
        // Actualizar la configuración existente
        this.configRepository.merge(config, createConfigDto);
    } else {
        // Crear una nueva configuración
        config = this.configRepository.create(createConfigDto);
    }

    return await this.configRepository.save(config);
}
}
