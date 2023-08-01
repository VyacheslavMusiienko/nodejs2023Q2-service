import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, DatabaseService],
})
export class FavoriteModule {}
