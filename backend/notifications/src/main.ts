import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [config.get<string>('rabbitmq.url')],
      queue: config.get<string>('rabbitmq.queue'),
      queueOptions: { durable: true },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3004);
}
bootstrap();

