import { PickType } from '@nestjs/swagger';
import { Artwork } from '../entities/artwork.entity';

export class CreateArtworkDto extends PickType(Artwork, ['title', 'description']) {}
