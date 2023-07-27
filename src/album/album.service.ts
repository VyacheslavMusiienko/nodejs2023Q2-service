import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@Injectable()
export class AlbumService {
  findAll() {
    return 'All albums';
  }

  findOne(id: number) {
    return 'One album';
  }

  create(createAlbum: CreateAlbumDto) {
    return 'Create album';
  }

  update(id: number, updateAlbum: UpdateAlbumDto) {
    return 'Update information about album';
  }

  delete(id: number) {
    return 'Delete album';
  }
}
