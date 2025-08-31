import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkController } from 'src/controllers/artwork.controller';
import { Artwork } from 'src/models/entities/artwork.entity';
import { ArtworkService } from './artwork.service';
import { S3Service } from 'configs/s3/s3.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork]), PassportModule],
  controllers: [ArtworkController],
  providers: [ArtworkService, JwtStrategy, S3Service],
})
export class ArtworkModule {}
