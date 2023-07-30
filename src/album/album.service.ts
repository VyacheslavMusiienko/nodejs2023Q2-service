import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { NotFoundError } from '../errors/notFound';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album } from './entity/album.entity';
import { Track } from '../track/entity/track.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.albums.find();
  }

  async findOne(id: string) {
    const findAlbum = this.databaseService.albums.findUnique({ id });

    if (findAlbum === null) {
      throw new NotFoundError();
    }

    return findAlbum;
  }

  async create({ name, year, artistId }: CreateAlbumDto) {
    const album = new Album({
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    });

    return await this.databaseService.albums.create(album);
  }

  async update(id: string, updateAlbum: UpdateAlbumDto) {
    const foundAlbum = await this.databaseService.albums.findUnique({ id });

    if (foundAlbum === null) {
      throw new NotFoundError();
    }

    const updatedTrack = new Album({
      ...foundAlbum,
      ...updateAlbum,
    });

    return await this.databaseService.albums.update(id, updatedTrack);
  }

  async remove(id: string) {
    const isAlbum = await this.databaseService.albums.has(id);
    if (!isAlbum) {
      throw new NotFoundError();
    }

    await this.databaseService.favorites.albums.delete(id);

    const tracks: Track[] = await this.databaseService.tracks.find();

    tracks.forEach(async (track) => {
      if (track.albumId === id) {
        const updatedTrack = {
          ...track,
          albumId: null,
        };

        await this.databaseService.tracks.update(track.id, updatedTrack);
      }
    });

    return await this.databaseService.albums.remove({ id });
  }
}
