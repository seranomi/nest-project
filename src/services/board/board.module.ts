import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/models/entities/board.entity';
import { BoardController } from 'src/controllers/board.controller';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), PassportModule],
  controllers: [BoardController],
  providers: [BoardService, JwtStrategy],
  exports: [],
})
export class BoardModule {}
