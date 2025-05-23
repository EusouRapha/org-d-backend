import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;
  constructor(
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

async signIn(body: SignInRequestDto): Promise<SignInResponseDto> {
  const foundClient = await this.clientsService.findOneByCPF(body.cpf);
  if (!foundClient || !bcryptCompareSync(body.password, foundClient.password)) {
    throw new UnauthorizedException();
  }
  const payload = { sub: foundClient.client_id, clientName: foundClient.name };
  return {
    id: foundClient.client_id,
    name: foundClient.name,
    cpf: foundClient.cpf,
    phone_number: foundClient.phone_number,
    access_token: await this.jwtService.signAsync(payload),
    expiresIn: this.jwtExpirationTime,
  } ;
}
}
