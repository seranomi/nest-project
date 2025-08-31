import { PickType } from '@nestjs/swagger';
import { Exhibition } from '../entities/exhibition.entity';

export class CreateExhibitionDto extends PickType(Exhibition, ['title', 'description']) {}
