import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
    const foundUser = await this.usersService.findOneByEmail(body.email);
    if (foundUser && !bcryptCompareSync(body.password, foundUser.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: foundUser.user_id, username: foundUser.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      expiresIn: this.jwtExpirationTime,
    };
  }
}
