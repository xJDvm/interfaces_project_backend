import { Controller, Get, Patch, Param, Body, Post, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../entities/profile.entity';
import { plainToClass } from 'class-transformer';
import { Multer } from 'multer'; // Importar el tipo Multer


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
    @UploadedFile() file: Multer.File, // Usar el tipo Multer.File
  ): Promise<Profile> {
    const updateProfileDto = plainToClass(UpdateProfileDto, body);

    if (file) {
      updateProfileDto.imagePath = file.path;
    }

    // Check if address is a string and parse it if necessary
    if (typeof body.address === 'string') {
      updateProfileDto.address = JSON.parse(body.address);
    } else {
      updateProfileDto.address = body.address;
    }

    return this.profileService.update(id, updateProfileDto);
  }
}
