import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exhibition } from './exhibition.entity';
import { Artwork } from './artwork.entity';

@Entity()
export class ExhibitionArtwork {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.artworks, {
    onDelete: 'CASCADE',
    eager: false,
  })
  exhibition: Exhibition;

  @ManyToOne(() => Artwork, (artwork) => artwork.exhibitions, {
    onDelete: 'CASCADE',
    eager: true,
  })
  artwork: Artwork;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
