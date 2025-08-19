import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { stat } from 'fs';
import { DeleteStatus } from 'src/commons/enums/delete-status.enum';
import { CreateUserDto } from 'src/models/dto/create-user.dto';
import { User } from 'src/models/entities/user.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  @ApiOkResponse({ description: '사용자 데이터 반환', type: User })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  // @Put(':id')
  // async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
  // 	return await this.userService.updateUser(id, updateUserDto);
  // }

  @ApiOperation({ summary: '회원탈퇴' })
  @Delete(':id')
  @ApiOkResponse({ description: '성공 여부 반환', type: String })
  async deleteUser(@Param('id') id: number): Promise<DeleteStatus> {
    const status: DeleteStatus = await this.userService.deleteUser(id);
    if (status == DeleteStatus.Fail) {
      throw new NotFoundException('사용자가 없습니다.');
    }
    return status;
  }

  @ApiOperation({ description: '회원 단건 조회' })
  @Get(':id')
  @ApiOkResponse({ description: '사용자 데이터 반환', type: User })
  async findOneUser(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOneUserById(id);
    if (!user || user == null) {
      throw new NotFoundException('사용자가 없습니다.');
    }
    return user;
  }
}
