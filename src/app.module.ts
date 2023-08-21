import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavoriteModule } from './favorite/favorite.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { AllExceptionsFilter } from './utils/filter/allExceptionsFilter';
import { LoggingInterceptor } from './utils/interceptor/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavoriteModule,
    AuthModule,
    LoggerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
