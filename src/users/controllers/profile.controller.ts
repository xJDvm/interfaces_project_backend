import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile> {
    return this.profileService.update(id, updateProfileDto);
  }
}
