import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return plainToClass(User, user);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: newUser,
    });

    return plainToClass(User, user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`User was not found`);

    if (user.password === oldPassword) {
      await this.prismaService.user.update({
        where: { id: id },
        data: {
          version: { increment: 1 },
          password: newPassword,
        },
      });

      return await this.prismaService.user.findUnique({
        where: { id: id },
      });
    }

    throw new ForbiddenException(`User oldPassword is wrong`);
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } });

      return true;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return false;
      }

      throw error;
    }
  }
}
