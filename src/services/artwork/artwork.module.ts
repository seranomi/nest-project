import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artwork } from "src/models/entities/atrwork.entity";

@Module({
  imports: [
	TypeOrmModule.forFeature([Artwork]),
  ],
  controllers: [],
  providers: [],
})
export class ArtworkModule {}