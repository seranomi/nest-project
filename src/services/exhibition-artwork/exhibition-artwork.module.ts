import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionArtworkController } from 'src/controllers/exhibition-artwork.controller';
import { ExhibitionArtwork } from 'src/models/entities/exhibition-artwork.entity';
import { ExhibitionArtworkService } from './exhibition-artwork.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Exhibition } from 'src/models/entities/exhibition.entity';
import { Artwork } from 'src/models/entities/artwork.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExhibitionArtwork, Exhibition, Artwork]),
    PassportModule,
  ],
  controllers: [ExhibitionArtworkController],
  providers: [ExhibitionArtworkService, JwtStrategy],
})
export class ExhibitionArtworkModule {}
