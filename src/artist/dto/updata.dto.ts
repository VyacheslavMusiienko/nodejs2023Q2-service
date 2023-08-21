import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
