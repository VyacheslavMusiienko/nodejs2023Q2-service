import { Album } from '../../album/entity/album.entity';
import { Artist } from '../../artist/entity/artist.entity';
import { Track } from '../../track/entity/track.entity';
import { User } from '../../user/entity/user.entity';
import { BaseRepository } from './response';

let instanceDB = null;

export const fakeDB = () => {
  if (instanceDB === null) {
    instanceDB = {
      users: new BaseRepository<User>(),
      artists: new BaseRepository<Artist>(),
      tracks: new BaseRepository<Track>(),
      albums: new BaseRepository<Album>(),
      favorites: {
        artists: new Map<string, Artist>(),
        albums: new Map<string, Album>(),
        tracks: new Map<string, Track>(),
      },
    };
  }

  return instanceDB;
};

export const databaseFake = {
  fakeDB,
};

export type DatabaseInstance = ReturnType<typeof fakeDB>;
