import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ExhibitionArtwork } from './exhibition-artwork.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.artworks, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ExhibitionArtwork,
    (exhibitionArtwork) => exhibitionArtwork.artwork,
  )
  exhibitions: ExhibitionArtwork[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
