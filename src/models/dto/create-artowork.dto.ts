import { PickType } from '@nestjs/swagger';
import { Artwork } from '../entities/atrwork.entity';

export class CreateArtworkDto extends PickType(Artwork, ['title', 'description']) {}
