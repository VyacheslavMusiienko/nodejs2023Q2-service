import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthenticationService } from '../database/authentication/authentication.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService, AuthenticationService],
})
export class UserModule {}
