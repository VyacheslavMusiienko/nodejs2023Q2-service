import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { HttpNotFound } from '../errors/http/httpNotFound';
import { HttpServerError } from '../errors/http/httpServer';
import { HttpUnprocessable } from '../errors/http/httpUnprocessable';
import { NotFoundError } from '../errors/notFound';
import { UnprocessableError } from '../errors/unprocessable';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Post('/track/:id')
  async createTrack(@Param() id: string) {
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
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param() id: string) {
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
  async createAlbum(@Param() id: string) {
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
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param() id: string) {
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
  async createArtist(@Param() id: string) {
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
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param() id: string) {
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
