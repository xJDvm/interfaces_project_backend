import { Injectable, NotFoundException } from '@nestjs/common';
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
    const audioFiles = files.filter((file) => file.mimetype.startsWith('audio/'));

    if (audioFiles.length > 3) {
      throw new Error('Solo puedes tener hasta 3 archivos de audio.');
    }

    const existingAudios = await this.fileRepository.find({
      where: { mimetype: 'audio/mpeg' },
      order: { audioIndex: 'ASC' },
    });

    const usedIndices = existingAudios.map((audio) => audio.audioIndex);

    const availableIndices = [1, 2, 3].filter((index) => !usedIndices.includes(index));

    if (availableIndices.length < audioFiles.length) {
      throw new Error('No hay espacio suficiente para nuevos archivos de audio.');
    }

    audioFiles.forEach((file, index) => {
      const audioIndex = availableIndices[index];
      file['audioIndex'] = audioIndex;
    });

    const fileMetadata = files.map((file) => ({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      audioIndex: file['audioIndex'],
    }));

    return await this.fileRepository.save(fileMetadata);
  }

  async getAllFiles() {
    return await this.fileRepository.find();
  }
  async deleteFileById(id: number): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(`Archivo con ID ${id} no encontrado.`);
    }

    await this.fileRepository.delete(id);
  }

}
