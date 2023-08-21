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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { Auth } from '../utils/decorator/auth.decorator';
import { ResponseMessages } from '../utils/enum/responseMessage';
import { UnEntityInterceptor } from '../utils/interceptor/unEntity.interceptor';
import { FavoriteService } from './favorite.service';

@ApiTags('Favorites')
@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @ApiOperation({ summary: 'Add track to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Track'))
  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createTrack(id);
  }

  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Delete('/track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeTrack(id);
  }

  @ApiOperation({ summary: 'Add album to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Album'))
  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createAlbum(id);
  }

  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Delete('/album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeAlbum(id);
  }

  @ApiOperation({ summary: 'Add artist to the favorites' })
  @ApiCreatedResponse({ description: 'Added successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @UseInterceptors(new UnEntityInterceptor('Artist'))
  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.createArtist(id);
  }

  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiUnprocessableEntityResponse({ description: ResponseMessages.NOT_FOUND })
  @Delete('/artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoriteService.removeArtist(id);
  }
}
