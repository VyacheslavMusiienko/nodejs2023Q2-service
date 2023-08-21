import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './../database/prisma/prisma.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/updata.dto';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    const artists = await this.prismaService.artist.findMany();
    return artists.map((artist) => plainToClass(Artist, artist));
  }

  async findOne(id: string): Promise<Artist | null> {
    const findArtist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!findArtist) {
      return null;
    }

    return plainToClass(Artist, findArtist);
  }

  async create(createArtist: CreateArtistDto): Promise<Artist> {
    const artist = new Artist({
      id: uuidv4(),
      ...createArtist,
    });
    const artistResponse = await this.prismaService.artist.create({
      data: artist,
    });

    return plainToClass(Artist, artistResponse);
  }

  async update(
    id: string,
    updateArtist: UpdateArtistDto,
  ): Promise<Artist | null> {
    try {
      const updatedArtist = await this.prismaService.artist.update({
        where: { id },
        data: updateArtist,
      });

      return plainToClass(Artist, updatedArtist);
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
      await this.prismaService.artist.delete({
        where: { id },
      });

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
