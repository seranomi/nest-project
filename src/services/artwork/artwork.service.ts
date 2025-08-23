import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'configs/s3/s3.service';
import { CreateArtworkDto } from 'src/models/dto/create-artowork.dto';
import { Artwork } from 'src/models/entities/atrwork.entity';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepo: Repository<Artwork>,
    private readonly s3Service: S3Service,
  ) {}

  async createArtwork(
    file: Express.Multer.File,
    uploadDto: CreateArtworkDto,
    user: User,
  ) {
    const url = await this.s3Service.uploadFile(file);

    const artwork = this.artworkRepo.create({
      title: uploadDto.title,
      description: uploadDto.description,
      url,
      user,
    });

    return await this.artworkRepo.save(artwork);
  }

  async getArtworks(user: User): Promise<Artwork[]> {
    return await this.artworkRepo.find({
      where: { user: { id: user.id } },
      order: { created_at: 'DESC' },
    });
  }

  async getAllArtworks(): Promise<Artwork[]> {
    return await this.artworkRepo.find({
      order: { created_at: 'DESC' },
    });
  }
}
