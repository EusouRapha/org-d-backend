import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInRequestDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: SignInRequestDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(body.email);
    if (user?.password !== body.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.user_id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
