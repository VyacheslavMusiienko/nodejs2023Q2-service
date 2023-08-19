import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import { Album } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Album[]> {
    const albums = await this.prismaService.album.findMany();
    return albums.map((album) => plainToClass(Album, album));
  }

  async findOne(id: string): Promise<Album | null> {
    const findAlbum = this.prismaService.album.findUnique({ where: { id } });

    if (!findAlbum) {
      null;
    }

    return plainToClass(Album, findAlbum);
  }

  async create({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    const album = new Album({
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    });

    const newAlbum = await this.prismaService.album.create({ data: album });

    return plainToClass(Album, newAlbum);
  }
  async update(id: string, updateAlbum: UpdateAlbumDto): Promise<Album | null> {
    try {
      const updateAlbumResponse = await this.prismaService.album.update({
        where: { id },
        data: updateAlbum,
      });
      return plainToClass(Album, updateAlbumResponse);
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
      await this.prismaService.album.delete({ where: { id } });
      return true;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return false;
      }

      throw error;
    }
  }
}
