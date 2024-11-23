import { Controller, Post, Get, Delete, UploadedFiles, UseInterceptors, BadRequestException, Param } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Delete(':id')
  async deleteFile(@Param('id') id: number) {
    const files = await this.fileService.deleteFileById(id);
    return {
      message: 'Archivo eliminado exitosamente',
      data: files,
    };
  }

  @Get()
  async getAllFiles() {
    const files = await this.fileService.getAllFiles();
    return {
      message: 'Archivos obtenidos exitosamente',
      data: files,
    };
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const ext = path.extname(file.originalname);
          const filename = `${uuidv4()}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg', 'image/png', // Imágenes
          'audio/mpeg', 'audio/wav', // Audios
          'video/mp4',               // Videos
          'text/vtt',                // Subtítulos
          'application/pdf',         // PDFs
          'text/html',               // HTML
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error(`Tipo de archivo no permitido: ${file.mimetype}`), false);
        }
      },
    }),
  )
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    // Clasificar archivos por tipo
    const images = files.filter((file) => file.mimetype.startsWith('image/'));
    const audios = files.filter((file) => file.mimetype.startsWith('audio/'));
    const videos = files.filter((file) => file.mimetype.startsWith('video/'));
    const subtitles = files.filter((file) => file.mimetype === 'text/vtt');
    const pdfs = files.filter((file) => file.mimetype === 'application/pdf');
    const htmls = files.filter((file) => file.mimetype === 'text/html');

    // // Validar las restricciones
    // if (audios.length !== 3) throw new BadRequestException('Debes enviar exactamente 3 archivos de audio');
    // if (videos.length !== 1) throw new BadRequestException('Debes enviar exactamente 1 video');
    // if (subtitles.length !== 1) throw new BadRequestException('Debes enviar exactamente 1 archivo de subtítulos');
    // if (pdfs.length !== 1) throw new BadRequestException('Debes enviar exactamente 1 archivo PDF');
    // if (htmls.length !== 1) throw new BadRequestException('Debes enviar exactamente 1 archivo HTML');

    // Guardar metadatos de los archivos en la base de datos
    const savedFiles = await this.fileService.saveFileMetadata(files);

    return {
      message: 'Archivos subidos exitosamente',
      data: savedFiles,
    };
  }
}
