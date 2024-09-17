import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { Users } from '../entities/user.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id }, relations: ['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { id }, relations: ['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    if (updateProfileDto.username) {
      profile.user.username = updateProfileDto.username;
      await this.userRepository.save(profile.user);
    }

    Object.assign(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }
}
