import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exhibition } from './exhibition.entity';
import { Artwork } from './artwork.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Exhibition, (exhibition) => exhibition.user)
  exhibitions: Exhibition[];

  @OneToMany(() => Artwork, (artwork) => artwork.user)
  artworks: Artwork[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
