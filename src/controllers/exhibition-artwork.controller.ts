import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateExhibitionArtworkDto } from 'src/models/dto/create-exhibition-artwork.dto';
import { ExhibitionArtwork } from 'src/models/entities/exhibition-artwork.entity';
import { ExhibitionArtworkService } from 'src/services/exhibition-artwork/exhibition-artwork.service';

@Controller('exhibition-artwork')
export class ExhibitionArtworkController {
  constructor(
    private readonly exhibitionArtworkService: ExhibitionArtworkService,
  ) {}

  @ApiOperation({ description: '작품 업로드' })
  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: '작품 업로드 성공' })
  async createArtwork(@Body() dto: CreateExhibitionArtworkDto): Promise<ExhibitionArtwork> {
    return await this.exhibitionArtworkService.createExhibitionArtwork(dto);
  }
  // Controller methods go here
}
