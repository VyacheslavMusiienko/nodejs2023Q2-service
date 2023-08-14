import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../utils/httpFilter';
import { TransformInterceptor } from '../utils/httpTransform';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@Controller('album')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createAlbum: CreateAlbumDto) {
    return await this.albumService.create(createAlbum);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbum: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumService.update(id, updateAlbum);

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.albumService.remove(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
