import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body() createArtist: CreateArtistDto) {
    return this.artistService.create(createArtist);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.artistService.delete(id);
  }
}
