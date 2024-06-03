import { Controller, Get, Query } from '@nestjs/common';
import { FeedService } from './feed.service';
import { Post } from '../post/post.entity';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Post[]; count: number }> {
    return this.feedService.getFeed(page, limit);
  }
}
