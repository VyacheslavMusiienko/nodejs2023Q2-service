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
import { UuidDto } from '../common/uuid.dto';
import { NotFoundError } from '../errors/notFound';
import { HttpNotFound } from './../errors/http/httpNotFound';
import { HttpServerError } from './../errors/http/httpServer';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) { id }: UuidDto) {
    try {
      return this.trackService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post()
  create(@Body() createTrack: CreateTrackDto) {
    return this.trackService.create(createTrack);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) { id }: UuidDto,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    try {
      return this.trackService.update(id, updateTrack);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }
      throw new HttpServerError();
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) { id }: UuidDto) {
    try {
      return this.trackService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
