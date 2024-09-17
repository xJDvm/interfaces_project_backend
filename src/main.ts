import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthGuard } from './auth/guard/auth.guard';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const authGuard = app.get(AuthGuard);
  app.useGlobalGuards(authGuard);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));


  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Descripcion Platzi Store')
    .setVersion('')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: 'http://localhost:4200', // Cambia esto al origen de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
