import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.prismaService.artistToFavorite.findMany({
        select: { artist: true },
      }),
      this.prismaService.albumToFavorite.findMany({ select: { album: true } }),
      this.prismaService.trackToFavorite.findMany({ select: { track: true } }),
    ]);

    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }

  async createTrack(id: string) {
    try {
      await this.prismaService.trackToFavorite.create({
        data: { trackId: id },
      });
      return { message: 'Add track to the favorites' };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new UnprocessableEntityException(`Track with ${id} not found`);
        }
        if (err.code === 'P2002') {
          return { message: 'Track already exist in favorites' };
        }
      }
      throw err;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.prismaService.trackToFavorite.delete({
        where: { trackId: id },
      });
      return { message: 'Remove track from the favorites' };
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with ${id} not found`);
      }
      throw err;
    }
  }

  async createAlbum(id: string) {
    try {
      await this.prismaService.albumToFavorite.create({
        data: { albumId: id },
      });
      return { message: 'Add album to the favorites' };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new UnprocessableEntityException(`Album with ${id} not found`);
        }
        if (err.code === 'P2002') {
          return { message: 'Album already exist in favorites' };
        }
      }
      throw err;
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.prismaService.albumToFavorite.delete({
        where: { albumId: id },
      });
      return { message: 'Remove album from the favorites' };
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Album with ${id} not found`);
      }
      throw err;
    }
  }

  async createArtist(id: string) {
    try {
      await this.prismaService.artistToFavorite.create({
        data: { artistId: id },
      });
      return { message: 'Add artist to the favorites' };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new UnprocessableEntityException(`Artist with ${id} not found`);
        }
        if (err.code === 'P2002') {
          return { message: 'Artist already exist in favorites' };
        }
      }
      throw err;
    }
  }

  async removeArtist(id: string) {
    try {
      await this.prismaService.artistToFavorite.delete({
        where: { artistId: id },
      });
      return { message: 'Remove artist from the favorites' };
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`Artist with ${id} not found`);
      }
      throw err;
    }
  }
}
