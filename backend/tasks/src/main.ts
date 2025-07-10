import { NestFactory } from '@nestjs/core';
import { TasksModule } from './interface/modules';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TasksModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3003' });
  await app.listen(3002);
}
bootstrap();
