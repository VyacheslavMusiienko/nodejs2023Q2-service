import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
})
export class ArtistModule {}
