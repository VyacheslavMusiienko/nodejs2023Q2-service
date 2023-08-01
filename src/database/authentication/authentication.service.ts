import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthenticationService {
  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
