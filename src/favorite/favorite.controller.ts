import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoriteService } from './favorite.service';
import { Auth } from '../utils/decorator/auth.decorator';

@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createTrack(id);
  }

  @Delete('/track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeTrack(id);
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createAlbum(id);
  }

  @Delete('/album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeAlbum(id);
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createArtist(id);
  }

  @Delete('/artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeArtist(id);
  }
}
