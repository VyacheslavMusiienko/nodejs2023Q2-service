import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { HttpNotFound } from '../errors/http/httpNotFound';
import { HttpServerError } from '../errors/http/httpServer';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      return await this.albumService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post()
  async create(@Body() createAlbum: CreateAlbumDto) {
    return await this.albumService.create(createAlbum);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() UpdateAlbum: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.update(id, UpdateAlbum);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: string) {
    try {
      return await this.albumService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
