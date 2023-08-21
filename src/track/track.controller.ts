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
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { TrackService } from './track.service';

@ApiTags('Tracks')
@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @ApiOperation({ summary: 'Get tracks list' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  @Header('Content-Type', 'application/json')
  async findAll() {
    return await this.trackService.findAll();
  }

  @ApiOperation({ summary: 'Get single track by id' })
  @ApiOkResponse({ description: 'Found track' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @UseInterceptors(new NotFoundInterceptor('Track'))
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Add new track' })
  @ApiCreatedResponse({ description: 'New track is created' })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  async create(
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    createTrack: CreateTrackDto,
  ) {
    return await this.trackService.create(createTrack);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track information by ID' })
  @ApiOkResponse({ description: 'Track updated' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseMessages.SERVER_ERROR,
  })
  @UseInterceptors(new NotFoundInterceptor('Track'))
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe({ validateCustomDecorators: true }))
    updateTrack: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrack);

    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }

    return updatedTrack;
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @ApiOperation({ summary: 'Delete Track by ID' })
  @ApiNoContentResponse({ description: 'Track deleted' })
  @ApiNotFoundResponse({ description: `Track ${ResponseMessages.NOT_FOUND}` })
  @ApiBadRequestResponse({ description: ResponseMessages.BAD_REQUEST })
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.trackService.remove(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
