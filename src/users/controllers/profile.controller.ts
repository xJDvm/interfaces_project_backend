import { Controller, Get, Patch, Param, Body, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { Profile } from '../entities/profile.entity';
import { plainToClass } from 'class-transformer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

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
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
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
