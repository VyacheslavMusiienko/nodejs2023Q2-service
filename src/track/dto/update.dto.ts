import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateTrackDto } from './create.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;

  @IsOptional()
  @IsUUID(4)
  albumId?: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
