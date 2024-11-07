import { Controller, Get, Patch, Param, Body, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../entities/profile.entity';
import { plainToClass } from 'class-transformer';
import { Express } from 'express'; // Importar el tipo de Express para archivos

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Profile> {
    const updateProfileDto = plainToClass(UpdateProfileDto, body);

    if (file) {
      updateProfileDto.imagePath = file.path;
    }
    if (typeof body.address === 'string') {
      updateProfileDto.address = JSON.parse(body.address);
    } else {
      updateProfileDto.address = body.address;
    }

    return this.profileService.update(id, updateProfileDto);
  }
}
