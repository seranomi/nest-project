import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExhibitionDto } from 'src/models/dto/create-exhibition.dto';
import { Exhibition } from 'src/models/entities/exhibition.entity';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExhibitionService {
  // Service methods go here
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepo: Repository<Exhibition>,
  ) {}

  async createExhibition(
    createExhibitionDto: CreateExhibitionDto,
    user: User,
  ): Promise<Exhibition> {
    const exhibition = this.exhibitionRepo.create({
      title: createExhibitionDto.title,
      description: createExhibitionDto.description,
      user,
    });

    return await this.exhibitionRepo.save(exhibition);
  }

  async getExhibitions(): Promise<Exhibition[]> {
    return await this.exhibitionRepo.find();
  }
}
