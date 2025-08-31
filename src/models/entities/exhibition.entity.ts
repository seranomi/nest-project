import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Artwork } from './artwork.entity';
import { ExhibitionArtwork } from './exhibition-artwork.entity';

@Entity()
export class Exhibition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ExhibitionArtwork, (exhibitionArtwork: ExhibitionArtwork) => exhibitionArtwork.exhibition, { eager: true })
  artworks: ExhibitionArtwork[];
}
