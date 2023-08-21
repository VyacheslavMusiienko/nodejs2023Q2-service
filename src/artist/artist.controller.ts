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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';

@ApiTags('Artists')
@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.artistService.findAll();
  }

  @ApiOperation({ summary: 'Get Artist By Id' })
  @ApiOkResponse({ description: 'Found artist' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Artist'))
  @Get(':id')
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @ApiOperation({ summary: 'Add new artist' })
  @ApiCreatedResponse({ description: 'New artist is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Post()
  @Header('Content-Type', 'application/json')
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    createArtist: CreateArtistDto,
  ) {
    return await this.artistService.create(createArtist);
  }

  @ApiOperation({ summary: 'Update Artist by ID' })
  @ApiOkResponse({ description: 'Artist updated' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Artist'))
  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    updateArtist: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistService.update(id, updateArtist);

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return updatedArtist;
  }

  @ApiOperation({ summary: 'Delete Artist by ID' })
  @ApiNoContentResponse({ description: 'Artist deleted' })
  @ApiNotFoundResponse({ description: `Artist ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.artistService.remove(id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
