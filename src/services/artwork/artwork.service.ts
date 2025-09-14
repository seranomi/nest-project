import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'configs/s3/s3.service';
import { DeleteStatus } from 'src/commons/enums/delete-status.enum';
import { CreateArtworkDto } from 'src/models/dto/create-artwork.dto';
import { UpdateArtworkDto } from 'src/models/dto/update-artwork.dto';
import { Artwork } from 'src/models/entities/artwork.entity';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtworkService {
  private readonly logger = new Logger(ArtworkService.name);
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
      order: { created_at: 'ASC' },
    });
  }

  async getAllArtworks(): Promise<Artwork[]> {
    return await this.artworkRepo.find({
      order: { created_at: 'ASC' },
    });
  }

  async deleteArtwork(id: string, user: User): Promise<DeleteStatus> {
    const artwork = await this.artworkRepo.findOne({
      where: { id: Number(id), user: { id: user.id } },
    });
    if (!artwork) {
      return DeleteStatus.Fail;
    }
    try {
      await this.s3Service.deleteFile(artwork.url);
      await this.artworkRepo.remove(artwork);
      return DeleteStatus.Success;
    } catch (e) {
      this.logger.error(`deleteArtwork failed: ${e?.message || e}`, e?.stack);
      return DeleteStatus.Fail;
    }
  }

  async updateArtwork(
    id: string,
    user: User,
    updateDto?: UpdateArtworkDto,
    file?: Express.Multer.File,
  ): Promise<Artwork | null> {
    const artwork = await this.artworkRepo.findOne({
      where: { id: Number(id), user: { id: user.id } },
    });
    if (!artwork) {
      return null;
    }
    try {
      if (file) {
        const updatedUrl = await this.s3Service.updateFile(artwork.url, file);
        artwork.url = updatedUrl;
      }
      if (updateDto) {
        if (updateDto.title !== undefined) {
          artwork.title = updateDto.title;
        }
        if (updateDto.description !== undefined) {
          artwork.description = updateDto.description;
        }
      }
      await this.artworkRepo.save(artwork);
      return artwork;
    } catch (e) {
      this.logger.error(`updateArtwork failed: ${e?.message || e}`, e?.stack);
      return null;
    }
  }
}
