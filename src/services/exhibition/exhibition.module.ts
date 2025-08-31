import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from 'src/models/entities/exhibition.entity';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionController } from 'src/controllers/exhibition.controller';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibition]), PassportModule],
  controllers: [ExhibitionController],
  providers: [ExhibitionService, JwtStrategy],
})
export class ExhibitionModule {}
