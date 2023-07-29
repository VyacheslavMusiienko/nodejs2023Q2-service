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
import { NotFoundError } from '../errors/notFound';
import { HttpNotFound } from './../errors/http/httpNotFound';
import { HttpServerError } from './../errors/http/httpServer';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackService } from './track.service';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    try {
      return await this.trackService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post()
  async create(@Body() createTrack: CreateTrackDto) {
    return await this.trackService.create(createTrack);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrack);
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
      return await this.trackService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
