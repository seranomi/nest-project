import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Token } from 'src/auth/token';
import { DeleteStatus } from 'src/commons/enums/delete-status.enum';
import { CreateArtworkDto } from 'src/models/dto/create-artwork.dto';
import { UpdateArtworkDto } from 'src/models/dto/update-artwork.dto';
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
  async createArtwork(
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

  @ApiOperation({ description: '작품 삭제' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: '작품 삭제 성공' })
  async deleteArtwork(
    @Param('id') id: string,
    @Req() req,
  ): Promise<DeleteStatus> {
    return await this.artworkService.deleteArtwork(id, req.user);
  }


  @ApiOperation({ description: '작품 수정' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: '작품 수정 성공' })
  async updateArtwork(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDto: UpdateArtworkDto,
    @Req() req,
  ): Promise<Artwork | null> {
    return await this.artworkService.updateArtwork(id, req.user, updateDto, file);
  }
}
