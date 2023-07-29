import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../database/database.service';
import { NotFoundError } from '../errors/notFound';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';
import { Artist } from './entity/artist.entity';
import { Track } from '../track/entity/track.entity';
import { Album } from '../album/entity/album.entity';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.artists.find();
  }

  async findOne(id: number) {
    const findTArtist = await this.databaseService.artists.findUnique({ id });
    if (findTArtist === null) {
      throw new NotFoundError();
    }

    return findTArtist;
  }

  async create(createArtist: CreateArtistDto) {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtist,
    });

    return await this.databaseService.artists.create(artist);
  }

  async update(id: number, updateArtist: UpdateArtistDto) {
    const findArtist = await this.databaseService.artists.findUnique({ id });

    if (findArtist === null) {
      throw new NotFoundError();
    }

    const updatedArtist = new Artist({ ...findArtist, updateArtist });

    return await this.databaseService.artists.update(id, updatedArtist);
  }

  async remove(id: string) {
    const isArtist = await this.databaseService.artists.has(id);
    if (!isArtist) {
      throw new NotFoundError();
    }

    // Remove from favorites
    await this.databaseService.favorites.artists.delete(id);

    // Remove from tracks
    const tracks: Track[] = await this.databaseService.tracks.find();

    tracks.forEach(async (track) => {
      if (track.artistId === id) {
        const updatedTrack = {
          ...track,
          artistId: null,
        };

        await this.databaseService.tracks.update(track.id, updatedTrack);
      }
    });

    // Remove from albums
    const albums: Album[] = await this.databaseService.albums.find();

    albums.forEach(async (album) => {
      if (album.artistId === id) {
        const updatedAlbum = {
          ...album,
          artistId: null,
        };

        await this.databaseService.albums.update(album.id, updatedAlbum);
      }
    });

    return await this.databaseService.artists.remove({ id });
  }
}
