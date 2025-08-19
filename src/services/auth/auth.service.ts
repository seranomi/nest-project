import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/models/entities/user.entity';
import { Payload } from 'src/auth/payload';
import { Token } from 'src/auth/token';
import { ReturnDocument } from 'typeorm';
import { LoginDto } from 'src/models/dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<Token> {
    const user = await this.userService.findOneUserByEmail(loginDto.email);
    if (!user || null) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }
    return await this.createToken(user);
  }

  async createToken(user: User): Promise<Token> {
    const payload: Payload = {
      id: user.id,
      email: user.email,
      password: user.password,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      jwtid: accessToken,
      expiresIn: 604800,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
