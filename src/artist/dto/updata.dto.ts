import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  id: string;
  name: string;
  grammy: boolean;
}
