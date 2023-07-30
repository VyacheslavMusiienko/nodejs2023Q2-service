import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.artistService.findOne(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createArtist: CreateArtistDto) {
    return await this.artistService.create(createArtist);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtist);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
