import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async saveFileMetadata(files: Array<Express.Multer.File>) {
    const fileMetadata = files.map((file) => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }));
    return await this.fileRepository.save(fileMetadata);
  }
  async getAllFiles() {
    return await this.fileRepository.find();
  }
}
