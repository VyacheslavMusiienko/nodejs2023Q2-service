import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';

@Injectable()
export class TrackService {
  findAll() {
    return 'All tracks';
  }

  findOne(id: number) {
    return 'One track';
  }

  create(createTrackDto: CreateTrackDto) {
    return 'Create Track';
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return 'Update information about track';
  }

  delete(id: number) {
    return 'Delete track';
  }
}
