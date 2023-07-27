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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() createAlbum: CreateAlbumDto) {
    return this.albumService.create(createAlbum);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateAlbum: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, UpdateAlbum);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.albumService.delete(id);
  }
}
