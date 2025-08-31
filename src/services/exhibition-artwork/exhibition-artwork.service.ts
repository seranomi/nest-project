import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExhibitionArtworkDto } from 'src/models/dto/create-exhibition-artwork.dto';
import { Artwork } from 'src/models/entities/artwork.entity';
import { ExhibitionArtwork } from 'src/models/entities/exhibition-artwork.entity';
import { Exhibition } from 'src/models/entities/exhibition.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ExhibitionArtworkService {
  constructor(
    @InjectRepository(ExhibitionArtwork)
    private readonly eaRepo: Repository<ExhibitionArtwork>,
    @InjectRepository(Exhibition)
    private readonly exhibitionRepo: Repository<Exhibition>,
    @InjectRepository(Artwork)
    private readonly artworkRepo: Repository<Artwork>,
  ) {}

  async createExhibitionArtwork(
    dto: CreateExhibitionArtworkDto,
  ): Promise<ExhibitionArtwork> {
    const [exhibition, artwork] = await Promise.all([
      this.exhibitionRepo.findOne({ where: { id: dto.exhibitionId } }),
      this.artworkRepo.findOne({ where: { id: dto.artworkId } }),
    ]);

    if (!exhibition || !artwork) {
      throw new Error('Exhibition or Artwork not found');
    }

    const exhibitionArtwork = this.eaRepo.create({
      exhibition,
      artwork,
    });

    return this.eaRepo.save(exhibitionArtwork);
  }

  // Service methods go here
}
