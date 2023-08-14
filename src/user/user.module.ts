import { Module } from '@nestjs/common';
import { AuthenticationService } from '../database/authentication/authentication.service';
import { PrismaModule } from './../database/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthenticationService],
  imports: [PrismaModule],
})
export class UserModule {}
