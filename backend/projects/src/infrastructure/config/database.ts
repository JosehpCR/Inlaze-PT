import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../orm/entities/ProjectEntity';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [ProjectEntity],
    synchronize: true, // en prod usa migraciones
  }),
});