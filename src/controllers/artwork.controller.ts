import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Token } from 'src/auth/token';
import { CreateArtworkDto } from 'src/models/dto/create-artowork.dto';
import { Artwork } from 'src/models/entities/atrwork.entity';
import { ArtworkService } from 'src/services/artwork/artwork.service';


@Controller('artworks')
export class ArtworkController {
  constructor(private readonly artworkService: ArtworkService) {}

  @ApiOperation({ description: '작품 업로드' })
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: '작품 업로드 성공' })
  async createArtwork (
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: CreateArtworkDto,
    @Req() req,
  ): Promise<Artwork> {
    return await this.artworkService.createArtwork(file, uploadDto, req.user);
  }

  @ApiOperation({ description: '작품 목록 조회' })
  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: '작품 목록 조회 성공', type: [Artwork] })
  async getArtworks(@Req() req): Promise<Artwork[]> {
    return await this.artworkService.getArtworks(req.user);
  }

  @ApiOperation({ description: '모든 작품 조회' })
  @Get('')
  @ApiOkResponse({ description: '모든 작품 조회 성공', type: [Artwork] })
  async getAllArtworks(): Promise<Artwork[]> {
    return await this.artworkService.getAllArtworks();
  }

}
