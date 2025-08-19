import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfig } from 'configs';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from '../payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth')?.jwt.secret,
    });
  }

  async validate(payload: Payload) {
    return { id: payload.id, email: payload.email };
  }
}
