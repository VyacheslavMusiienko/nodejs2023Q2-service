import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.artistService.findOne(id);
  }

  @Post()
  async create(@Body() createArtist: CreateArtistDto) {
    return await this.artistService.create(createArtist);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
