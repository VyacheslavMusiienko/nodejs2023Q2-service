import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../database/prisma/prisma.service';
import { compareData, hashData } from '../utils/bcript';
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

  async create({ login, password }: CreateUserDto): Promise<User> {
    const newUser = new User({
      id: uuidv4(),
      login,
      password: await hashData(password),
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await this.prismaService.user.create({
      data: newUser,
    });

    return plainToClass(User, user);
  }

  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const isPasswordsEqual = await compareData(oldPassword, user.password);

    if (isPasswordsEqual) {
      await this.prismaService.user.update({
        where: { id: id },
        data: {
          version: { increment: 1 },
          password: newPassword,
        },
      });

      const updatedUser = await this.prismaService.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          version: true,
          login: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return plainToClass(User, updatedUser);
    }

    throw new ForbiddenException(`User oldPassword is wrong`);
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } });

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
