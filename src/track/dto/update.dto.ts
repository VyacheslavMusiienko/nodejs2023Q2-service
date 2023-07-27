import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
