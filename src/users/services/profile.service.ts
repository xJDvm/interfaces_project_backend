import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { Users } from '../entities/user.entity';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import * as bcrypt from 'bcryptjs';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';


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

    if (updateProfileDto.password) {
      const hashedPassword = await bcrypt.hash(updateProfileDto.password, 10);
      profile.user.password = hashedPassword;
      await this.userRepository.save(profile.user);
    }

    if (updateProfileDto.imagePath) {
      profile.imagePath = updateProfileDto.imagePath;

      const imageSizes = [
        { size: 10, field: 'image1'},
        { size: 100, field: 'image2'},
        { size: 200, field: 'image3'},
      ];

      for (const {size, field} of imageSizes) {
        const resizedImagePath = await this.resizeImage(updateProfileDto.imagePath, size);
        profile[field] = resizedImagePath;
      }
    }

    Object.assign(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }

  private async resizeImage(imagePath: string, size: number): Promise<string> {
    const ext = path.extname(imagePath);
    const filename = path.basename(imagePath, ext);
    const resizedImagePath = path.join(path.dirname(imagePath), `${filename}-${size}x${size}${ext}`);
    // Implementar lógica de redimensionamiento de imágenes
    await sharp(imagePath)
      .resize(size, size)
      .toFile(resizedImagePath);

    return resizedImagePath;
  }
}
