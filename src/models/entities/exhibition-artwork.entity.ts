import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exhibition } from './exhibition.entity';
import { Artwork } from './atrwork.entity';

@Entity()
export class ExhibitionArtwork {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.artworks, { onDelete:'CASCADE', eager: false })
  exhibition: Exhibition;

  @ManyToOne(() => Artwork, (artwork) => artwork.exhibitions, { onDelete:'CASCADE', eager: true })
  artwork: Artwork;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
