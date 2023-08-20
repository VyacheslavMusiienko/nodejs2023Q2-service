import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { AutnModule } from './autn/autn.module';
import { AuthModule } from './auth/auth.module';
import { AutnService } from './autn/autn.service';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule, FavoriteModule, AutnModule, AuthModule],
  providers: [AutnService],
})
export class AppModule {}
