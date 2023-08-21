import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Track[]> {
    const tracks = await this.prismaService.track.findMany();

    return tracks.map((track) => plainToClass(Track, track));
  }

  async findOne(id: string): Promise<Track | null> {
    const track = await this.prismaService.track.findUnique({ where: { id } });

    if (!track) {
      return null;
    }

    return plainToClass(Track, track);
  }

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    const track = await this.prismaService.track.create({
      data: {
        name,
        duration,
        artist: artistId !== null ? { connect: { id: artistId } } : undefined,
        album: albumId !== null ? { connect: { id: albumId } } : undefined,
      },
    });

    return plainToClass(Track, track);
  }

  async update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track | null> {
    try {
      const updatedTrack = await this.prismaService.track.update({
        where: { id },
        data: {
          name,
          duration,
          artist: artistId !== null ? { connect: { id: artistId } } : undefined,
          album: albumId !== null ? { connect: { id: albumId } } : undefined,
        },
      });

      return plainToClass(Track, updatedTrack);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }

      throw error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.track.delete({ where: { id } });

      return true;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return false;
      }

      throw err;
    }
  }
}
