import { Module } from '@nestjs/common';
import { PostSchedulerService } from './post-scheduler.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [PostSchedulerService],
})
export class SchedulerModule {}
