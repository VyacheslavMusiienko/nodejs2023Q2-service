import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  #favoritesId: number;
  constructor(private readonly prismaService: PrismaService) {
    this.#favoritesId = 1;
  }

  async findAll() {
    const findManyFavorites = await this.prismaService.favorites.findMany({
      // where: {
      // id: this.#favoritesId,
      // },
      include: {
        albums: {
          select: {
            album: true,
          },
        },
        tracks: {
          select: {
            track: true,
          },
        },
        artists: {
          select: {
            artist: true,
          },
        },
      },
    });

    if (findManyFavorites.length === 0) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }

    const favorites = findManyFavorites[0];

    return {
      artists: favorites.artists.map((artistInfo) => artistInfo.artist),
      albums: favorites.albums.map((albumInfo) => albumInfo.album),
      tracks: favorites.tracks.map((trackInfo) => trackInfo.track),
    };
  }

  async createTrack(id: string) {
    try {
      await this.prismaService.trackToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          trackId: id,
        },
      });

      return 'Add track to the favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.prismaService.trackToFavorite.delete({
        where: {
          trackId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else throw error;
    }
  }

  async createAlbum(id: string) {
    try {
      await this.prismaService.albumToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          albumId: id,
        },
      });

      return 'Add album to the favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.prismaService.albumToFavorite.delete({
        where: {
          albumId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Album was not found`);
      } else throw error;
    }
  }

  async createArtist(id: string) {
    try {
      await this.prismaService.artistToFavorite.create({
        data: {
          favoritesId: this.#favoritesId,
          artistId: id,
        },
      });

      return 'Add artist to the favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist was not found`);
      } else throw error;
    }
  }

  async removeArtist(id: string) {
    try {
      await this.prismaService.artistToFavorite.delete({
        where: {
          artistId: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist was not found`);
      } else throw error;
    }
  }
}
