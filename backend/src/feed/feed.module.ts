import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { Post } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
