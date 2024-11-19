import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthGuard } from './auth/guard/auth.guard';
import { join } from 'path';
import * as serveStatic from 'serve-static';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authGuard = app.get(AuthGuard);
  app.useGlobalGuards(authGuard);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración del prefijo global
  app.setGlobalPrefix('api/v1');

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Descripcion Platzi Store')
    .setVersion('1.0') // Añade la versión de la API
    .addTag('users') // Añade etiquetas según sea necesario
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Habilita CORS para tu frontend
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:4200'], // Añade más orígenes según sea necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configura la carpeta de uploads como estática
  app.use('/uploads', serveStatic(join(__dirname, '..', 'uploads')));

  // Inicia el servidor
  await app.listen(5000, '0.0.0.0');
}
bootstrap();
