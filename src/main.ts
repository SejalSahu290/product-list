/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:8080', 
    methods: 'GET,POST,PATCH,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true, 
  });

  await app.listen(3000);
}
bootstrap();
