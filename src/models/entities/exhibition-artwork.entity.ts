import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exhibition } from './exhibition.entity';
import { Artwork } from './atrwork.entity';

@Entity()
export class ExhibitionArtwork {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.artworks, {
    eager: true,
  })
  exhibition: Exhibition;

  @ManyToOne(() => Artwork, (artwork) => artwork.exhibitions, { eager: true })
  artwork: Artwork;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
