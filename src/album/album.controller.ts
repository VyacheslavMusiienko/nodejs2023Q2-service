import {
  Body,
  ClassSerializerInterceptor,
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
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { Auth } from '../utils/decorator/auth.decorator';
import { ResponseMessages } from '../utils/enum/responseMessage';
import { NotFoundInterceptor } from '../utils/interceptor/notFound.interceptor';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@ApiTags('Albums')
@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get albums list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.albumService.findAll();
  }

  @ApiOperation({ summary: 'Get single album by id' })
  @ApiOkResponse({ description: 'Found album' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Album'))
  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @ApiOperation({ summary: 'Add new album' })
  @ApiCreatedResponse({ description: 'New album is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    createAlbum: CreateAlbumDto,
  ) {
    return await this.albumService.create(createAlbum);
  }

  @ApiOperation({ summary: 'Update Album by ID' })
  @ApiOkResponse({ description: 'Album updated' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @UseInterceptors(new NotFoundInterceptor('Album'))
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    updateAlbum: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumService.update(id, updateAlbum);

    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return updatedAlbum;
  }

  @ApiOperation({ summary: 'Delete Album by ID' })
  @ApiNoContentResponse({ description: 'Album deleted' })
  @ApiNotFoundResponse({ description: `Album ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
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
