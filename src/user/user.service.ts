import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthError } from '../errors/auth';
import { NotFoundError } from '../errors/notFound';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    return await this.databaseService.users.find();
  }

  async findOne(id: string): Promise<User> {
    const findUser = await this.databaseService.users.findUnique({ id });

    if (findUser === null) {
      throw new NotFoundError();
    }

    return findUser;
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const user = new User({
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return await this.databaseService.users.create(user);
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const findUser = await this.databaseService.users.findUnique({ id });

    if (findUser === null) {
      throw new NotFoundError();
    }

    const { password: currentPassword } = findUser;

    if (currentPassword !== oldPassword) {
      throw new AuthError();
    }

    const updatedUser = new User({
      ...findUser,
      password: newPassword,
      updatedAt: Date.now(),
      version: findUser.version + 1,
    });

    return await this.databaseService.users.update(id, updatedUser);
  }

  async remove(id: string) {
    const isUser = await this.databaseService.users.has(id);
    if (!isUser) {
      throw new NotFoundError();
    }

    return await this.databaseService.users.remove({ id });
  }
}
