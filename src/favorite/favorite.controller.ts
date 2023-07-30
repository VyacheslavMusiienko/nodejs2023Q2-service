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
import { HttpNotFound } from '../errors/http/httpNotFound';
import { HttpServerError } from '../errors/http/httpServer';
import { HttpUnprocessable } from '../errors/http/httpUnprocessable';
import { NotFoundError } from '../errors/notFound';
import { UnprocessableError } from '../errors/unprocessable';
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
    try {
      return await this.favoriteService.createTrack(id);
    } catch (err) {
      if (err instanceof UnprocessableError) {
        throw new HttpUnprocessable();
      }

      throw new HttpServerError();
    }
  }

  @Delete('/track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoriteService.removeTrack(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoriteService.createAlbum(id);
    } catch (err) {
      if (err instanceof UnprocessableError) {
        throw new HttpUnprocessable();
      }

      throw new HttpServerError();
    }
  }

  @Delete('/album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoriteService.removeAlbum(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoriteService.createArtist(id);
    } catch (err) {
      if (err instanceof UnprocessableError) {
        throw new HttpUnprocessable();
      }

      throw new HttpServerError();
    }
  }

  @Delete('/artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.favoriteService.removeArtist(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
