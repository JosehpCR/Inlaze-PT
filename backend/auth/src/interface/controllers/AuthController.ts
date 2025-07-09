import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { RegisterHttpDto } from '../dtos/RegisterHttpDto';
import { LoginHttpDto } from '../dtos/LoginHttpDto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterHttpDto) {
    return this.registerUser.execute(dto);
  }

  @Post('login')
  login(@Body() dto: LoginHttpDto) {
    return this.loginUser.execute(dto);
  }
}
