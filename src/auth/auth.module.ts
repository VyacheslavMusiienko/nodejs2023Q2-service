import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../database/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  providers: [AuthService, RtStrategy, AtStrategy],
  controllers: [AuthController],
  imports: [PrismaModule, UserModule, JwtModule.register({})],
})
export class AuthModule {}
