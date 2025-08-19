import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { DeleteStatus } from 'src/commons/enums/delete-status.enum';
import { CreateBoardDto } from 'src/models/dto/create-board.dto';
import { UpdateBoardDto } from 'src/models/dto/update-board.dto';
import { Board } from 'src/models/entities/board.entity';
import { User } from 'src/models/entities/user.entity';
import { BoardService } from 'src/services/board/board.service';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ description: '게시판 글 작성' })
  @ApiOkResponse({ description: '생성된 게시글 조회', type: Board })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createBoard(
    @Req() req: { user: User },
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board> {
    return await this.boardService.createBoard(req.user, createBoardDto);
  }

  @ApiOperation({ description: '게시판 글 수정' })
  @ApiOkResponse({ description: '수정된 게시글 조회', type: Board })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBoard(
    @Req() req: { user: User },
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(req.user, id, updateBoardDto);
  }

  @ApiOperation({ description: '게시판 글 삭제' })
  @ApiOkResponse({ description: '삭제된 게시글 ID', type: Number })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBoard(
    @Req() req: { user: User },
    @Param('id') id: number,
  ): Promise<DeleteStatus> {
    const status: DeleteStatus = await this.boardService.deleteBoard(
      req.user,
      id,
    );
    if (status === DeleteStatus.Fail) {
      throw new NotFoundException('해당 게시물이 없습니다.');
    }
    return status;
  }

  @ApiOperation({ description: '게시판 글 단건 조회' })
  @ApiOkResponse({ description: '조회된 게시글', type: Board })
  @Get(':id')
  async findOneBoard(@Param('id') id: number): Promise<Board> {
    return await this.boardService.findOneBoard(id);
  }

  @ApiOperation({ description: '게시판 글 전체 조회' })
  @ApiOkResponse({ description: '조회된 게시글 목록', type: [Board] })
  @Get()
  async findAllBoards(): Promise<Board[]> {
    return await this.boardService.findAllBoards();
  }
}
