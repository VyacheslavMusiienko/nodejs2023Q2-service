import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';

@Injectable()
export class UserService {
  findAll() {
    return 'All User';
  }

  findOne(id: number) {
    return 'Single User';
  }

  create(createUserDto: CreateUserDto) {
    return 'Create user';
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return 'Update password';
  }

  delete(id: number) {
    'Delete user';
  }
}
