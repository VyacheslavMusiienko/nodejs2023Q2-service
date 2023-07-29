import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { NotFoundError } from '../errors/notFound';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.tracks.find();
  }

  async findOne(id: string) {
    const findTrack = await this.databaseService.tracks.findUnique({ id });

    if (findTrack === null) {
      throw new NotFoundError();
    }

    return findTrack;
  }

  async create({ name, duration, artistId, albumId }: CreateTrackDto) {
    const trackArtistId = (await this.databaseService.artists.has(artistId))
      ? artistId
      : null;

    const trackAlbumId = (await this.databaseService.albums.has(albumId))
      ? albumId
      : null;

    const track = new Track({
      id: uuidv4(),
      name,
      artistId: trackArtistId,
      albumId: trackAlbumId,
      duration,
    });

    return await this.databaseService.tracks.create(track);
  }

  async update(id: string, updateTrack: UpdateTrackDto) {
    const findTrack = await this.databaseService.tracks.findUnique({ id });

    if (findTrack === null) {
      throw new NotFoundError();
    }

    const updatedTrack = new Track({
      ...findTrack,
      ...updateTrack,
    });

    return await this.databaseService.tracks.update(id, updatedTrack);
  }

  async remove(id: string) {
    const isTrack = await this.databaseService.tracks.has(id);
    if (!isTrack) {
      throw new NotFoundError();
    }

    // Remove from favorite
    await this.databaseService.favorites.tracks.delete(id);

    return await this.databaseService.tracks.remove({ id });
  }
}
