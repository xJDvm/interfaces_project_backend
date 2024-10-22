// configs.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const userconfig = await this.configRepository.findOne({ where: { userId: userId } });
    if (!userconfig) {
      throw new NotFoundException('User Not Found')
    }
    return userconfig;
}

async create(createConfigDto: CreateConfigDto): Promise<Config> {
    // Verificar si el usuario existe
    const user = await this.userRepository.findOne({ where: { id: createConfigDto.userId } });
    if (!user) {
        throw new NotFoundException('User not found');
    }

    let config = await this.findConfigByUserId(createConfigDto.userId);

    if (config) {
        this.configRepository.merge(config, createConfigDto);
    } else {
        config = this.configRepository.create(createConfigDto);
    }

    return await this.configRepository.save(config);
}
}
