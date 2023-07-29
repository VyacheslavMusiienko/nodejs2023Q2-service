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

  findAll() {
    return this.databaseService.tracks.find();
  }

  findOne(id: number) {
    const findTrack = this.databaseService.tracks.findByOne({ id });

    if (findTrack === null) {
      throw new NotFoundError();
    }

    return findTrack;
  }

  create({ name, duration, artistId, albumId }: CreateTrackDto) {
    const trackArtistId = this.databaseService.artists.has(artistId)
      ? artistId
      : null;

    const trackAlbumId = this.databaseService.albums.has(albumId)
      ? albumId
      : null;

    const track = new Track({
      id: uuidv4(),
      name,
      artistId: trackArtistId,
      albumId: trackAlbumId,
      duration,
    });

    return this.databaseService.tracks.create(track);
  }

  update(id: number, updateTrack: UpdateTrackDto) {
    const findTrack = this.databaseService.tracks.findOneBy({ id });

    if (findTrack === null) {
      throw new NotFoundError();
    }

    const updatedTrack = new Track({
      ...findTrack,
      ...updateTrack,
    });

    return this.databaseService.tracks.update(id, updatedTrack);
  }

  remove(id: number) {
    if (!this.databaseService.tracks.has(id)) {
      throw new NotFoundError();
    }

    // Remove from favorite
    this.databaseService.favorites.tracks.delete(id);

    return this.databaseService.tracks.remove({ id });
  }
}
