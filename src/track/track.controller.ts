import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrack: CreateTrackDto) {
    return this.trackService.create(createTrack);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrack: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrack);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.trackService.delete(id);
  }
}
