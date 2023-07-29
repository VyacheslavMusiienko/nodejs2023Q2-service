import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
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
