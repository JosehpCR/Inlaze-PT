import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../infrastructure/config/configuration';
import { DatabaseModule } from '../infrastructure/config/database';
import { UserEntity } from '../infrastructure/orm/entities/UserEntity';
import { TypeOrmUserRepository } from '../infrastructure/orm/repositories/TypeOrmUserRepository';
import { RegisterUserUseCase } from '../application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from '../application/use-cases/LoginUseCase';
import { ValidateUserUseCase } from '../application/use-cases/ValidateUserUseCase';
import { AuthController } from './controllers/AuthController';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { JwtAuthGuard } from '../infrastructure/auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], envFilePath: '.env' }),
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expiresIn') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
    RegisterUserUseCase,
    LoginUseCase,
    ValidateUserUseCase,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
