import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Token } from 'src/auth/token';
import { LoginDto } from 'src/models/dto/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: '로그인' })
  @Post('login')
  @ApiOkResponse({ description: '로그인 성공 시 토큰 값', type: Token })
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return await this.authService.login(loginDto);
  }
}
