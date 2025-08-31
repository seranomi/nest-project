// dto/create-exhibition-artwork.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class CreateExhibitionArtworkDto {
  @IsInt()
  exhibitionId: number;

  @IsInt()
  artworkId: number;
}
