import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundError, Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) throw err;

    if (info instanceof Error) {
      const message = this.getTokenErrorMessage(info);
      throw message;
    }

    if (!user) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    return user;
  }

  private getTokenErrorMessage(error: Error) {
    if (error instanceof TokenExpiredError) {
      return new UnauthorizedException('토큰이 만료되었습니다.');
    }

    if (error instanceof JsonWebTokenError) {
      return new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    if (error.message === 'No auth token') {
      return new UnauthorizedException('토큰이 없습니다.');
    }

    return new BadRequestException(error.message);
  }
}
