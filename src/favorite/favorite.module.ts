import { Module } from '@nestjs/common';
import { PrismaModule } from './../database/prisma/prisma.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [PrismaModule],
})
export class FavoriteModule {}
