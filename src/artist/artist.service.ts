import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';

@Injectable()
export class ArtistService {
  findAll() {
    return 'All artists';
  }

  findOne(id: number) {
    return 'One artist';
  }

  create(createArtist: CreateArtistDto) {
    return 'Create artist';
  }

  update(id: number, updateArtist: UpdateArtistDto) {
    return 'Update information about artist';
  }

  delete(id: number) {
    return 'Delete artist';
  }
}
