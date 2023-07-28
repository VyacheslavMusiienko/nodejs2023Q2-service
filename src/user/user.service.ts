import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NotFoundError } from '../errors/notFound';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { User } from './entity/user.entity';
import { AuthError } from '../errors/auth';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.users.find();
  }

  findOne(id: number) {
    const findUser = this.databaseService.users.findUnique({ id });

    if (findUser === null) {
      throw new NotFoundError();
    }

    return findUser;
  }

  async create({ login, password }: CreateUserDto) {
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

  update(id: number, { oldPassword, newPassword }: UpdatePasswordDto) {
    const findUser = this.databaseService.users.findOneBy({ id });

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

    return this.databaseService.users.update(id, updatedUser);
  }

  remove(id: number) {
    if (!this.databaseService.users.has(id)) {
      throw new NotFoundError();
    }

    return this.databaseService.users.remove({ id });
  }
}
