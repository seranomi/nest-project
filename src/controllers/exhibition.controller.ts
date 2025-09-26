import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { create } from 'domain';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { DeleteStatus } from 'src/commons/enums/delete-status.enum';
import { CreateExhibitionDto } from 'src/models/dto/create-exhibition.dto';
import { Exhibition } from 'src/models/entities/exhibition.entity';
import { ExhibitionService } from 'src/services/exhibition/exhibition.service';

@Controller('exhibitions')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  @ApiOperation({ description: '전시관 생성' })
  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: '전시관 생성 성공' })
  async createExhibition(
	@Body() createExhibitionDto: CreateExhibitionDto,
	@Req() req,
  ): Promise<Exhibition> {
    return await this.exhibitionService.createExhibition(createExhibitionDto, req.user);
  }

  @ApiOperation({ description: '전시관 목록 조회' })
  @Get('')
  @ApiOkResponse({ description: '전시관 목록 조회 성공' })
  async getExhibitions(): Promise<Exhibition[]> {
    return await this.exhibitionService.getExhibitions();
  }

  @ApiOperation({ description: '전시관 단일 조회' })
  @Get('/:id')
  @ApiOkResponse({ description: '전시관 단일 조회 성공' })
  async getExhibitionsById(@Req() req): Promise<Exhibition | null> {
    const { id } = req.params;
    return await this.exhibitionService.getExhibitionsById(id);
  }

  @ApiOperation({ description: '전시관 삭제' })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: '전시관 삭제 성공' })
  async deleteExhibition(@Req() req): Promise<DeleteStatus> {
    const { id } = req.params;
    return await this.exhibitionService.deleteExhibition(id, req.user);
  }
}
