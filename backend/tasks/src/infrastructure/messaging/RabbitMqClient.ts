import { ClientsModule, Transport, RmqOptions } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const RabbitMqClient = ClientsModule.registerAsync([
  {
    name: 'TASKS_SERVICE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (cfg: ConfigService): RmqOptions => {
      // obtén las variables de entorno de forma estricta
      const url   = cfg.get<string>('rabbitmq.url',  'amqp://localhost:5672');
      const queue = cfg.get<string>('rabbitmq.queue', 'tasks_queue');

      return {
        transport: Transport.RMQ,
        options: {
          urls: [url],          // ← ahora es string[]
          queue,                // ← ahora es string
          queueOptions: {       // recomendable: marca la cola como durable
            durable: true,
          },
        },
      };
    },
  },
]);
