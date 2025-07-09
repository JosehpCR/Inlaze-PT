import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { LoginDto } from '../dtos/LoginDto';
import { TokenDto } from '../dtos/TokenDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export class LoginUseCase {
  constructor(
    private readonly repo: IUserRepository,
    private readonly jwt: JwtService,
  ) {}

  async execute(input: LoginDto): Promise<TokenDto> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id.toString(), email: user.email };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }
}
