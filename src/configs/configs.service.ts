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

  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    const user = await this.userRepository.findOne({ where: { id: createConfigDto.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const config = this.configRepository.create({
      ...createConfigDto,
      user: user,
    });

    return await this.configRepository.save(config);
  }
}
