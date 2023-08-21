import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateTrackDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID(4)
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
