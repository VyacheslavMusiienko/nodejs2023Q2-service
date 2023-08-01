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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';

@Controller('artist')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(new TransformInterceptor())
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createArtist: CreateArtistDto) {
    return await this.artistService.create(createArtist);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtist: UpdateArtistDto,
  ) {
    try {
      return await this.artistService.update(id, updateArtist);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new HttpNotFound();
      }

      throw new HttpServerError();
    }
  }
}
