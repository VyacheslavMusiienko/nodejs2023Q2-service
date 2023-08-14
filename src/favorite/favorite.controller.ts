import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../utils/httpFilter';
import { TransformInterceptor } from '../utils/httpTransform';
import { FavoriteService } from './favorite.service';

@Controller('favs')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
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
    const response = await this.favoriteService.createTrack(id);
    const message = { response };
    return message;
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
    const response = await this.favoriteService.createAlbum(id);
    const message = { response };
    return message;
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
    const response = await this.favoriteService.createArtist(id);
    const message = { response };
    return message;
  }

  @Delete('/artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeArtist(id);
  }
}
