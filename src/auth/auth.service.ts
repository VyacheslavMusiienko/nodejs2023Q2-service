import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signup(authUser: AuthUserDto) {
    return this.userService.create(authUser);
  }
  login({ login, password }: AuthUserDto) {
    return { login, password };
  }

  refresh({ login, password }: AuthUserDto) {
    return { login, password };
  }
}
