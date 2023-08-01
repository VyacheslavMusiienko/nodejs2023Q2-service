import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NotFoundError } from '../errors/notFound';
import { UnprocessableError } from '../errors/unprocessable';

@Injectable()
export class FavoriteService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return {
      artists: Array.from(
        await this.databaseService.favorites.artists.values(),
      ),
      albums: Array.from(await this.databaseService.favorites.albums.values()),
      tracks: Array.from(await this.databaseService.favorites.tracks.values()),
    };
  }

  async createTrack(id: string) {
    const findTrack = await this.databaseService.tracks.findUnique({ id });

    if (findTrack === null) {
      throw new UnprocessableError();
    }

    await this.databaseService.favorites.tracks.set(id, findTrack);
  }

  async removeTrack(id: string) {
    const isTrack = await this.databaseService.tracks.has(id);
    if (!isTrack) {
      throw new NotFoundError();
    }

    const isTrackInFavorite = await this.databaseService.favorites.tracks.has(
      id,
    );
    if (!isTrackInFavorite) {
      throw new NotFoundError();
    }

    await this.databaseService.favorites.tracks.delete(id);

    return id;
  }

  async createAlbum(id: string) {
    const findAlbum = await this.databaseService.albums.findUnique({ id });

    if (findAlbum === null) {
      throw new UnprocessableError();
    }

    await this.databaseService.favorites.albums.set(id, findAlbum);
  }

  async removeAlbum(id: string) {
    const isAlbum = await this.databaseService.albums.has(id);
    if (!isAlbum) {
      throw new NotFoundError();
    }

    const isAlbumInFavorite = await this.databaseService.favorites.albums.has(
      id,
    );
    if (!isAlbumInFavorite) {
      throw new NotFoundError();
    }

    await this.databaseService.favorites.albums.delete(id);

    return id;
  }

  async createArtist(id: string) {
    const findArtist = await this.databaseService.artists.findUnique({ id });

    if (findArtist === null) {
      throw new UnprocessableError();
    }

    this.databaseService.favorites.artists.set(id, findArtist);
  }

  async removeArtist(id: string) {
    const isArtist = await this.databaseService.artists.has(id);
    if (!isArtist) {
      throw new NotFoundError();
    }

    const isArtistInFavorite = await this.databaseService.favorites.artists.has(
      id,
    );
    if (!isArtistInFavorite) {
      throw new NotFoundError();
    }

    await this.databaseService.favorites.artists.delete(id);

    return id;
  }
}
