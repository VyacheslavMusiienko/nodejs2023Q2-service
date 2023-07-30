import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/notFound';
import { HttpExceptionFilter } from '../utils/httpFilter';
import { TransformInterceptor } from '../utils/httpTransform';
import { HttpNotFound } from './../errors/http/httpNotFound';
import { HttpServerError } from './../errors/http/httpServer';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackService } from './track.service';
import { AuthError } from '../errors/auth';
import { HttpForbidden } from '../errors/http/httpForbidden';

@Controller('track')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
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
  @Header('Content-Type', 'application/json')
  async create(@Body() createTrack: CreateTrackDto) {
    return await this.trackService.create(createTrack);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.update(id, updateTrack);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      } else if (error instanceof AuthError) {
        throw new HttpForbidden();
      }

      throw new HttpServerError();
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
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
