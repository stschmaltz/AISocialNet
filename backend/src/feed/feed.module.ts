import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
