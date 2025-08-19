import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExhibitionArtwork } from "src/models/entities/exhibition-artwork.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExhibitionArtwork]),
  ],
  controllers: [],
  providers: [],
})
export class ExhibitionArtworkModule {}
