import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma/prisma.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [PrismaModule],
})
export class TrackModule {}
