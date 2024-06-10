import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AIPostGenerationService } from '../post/ai-post-generation.service';

@Injectable()
export class PostSchedulerService {
  constructor(
    private readonly aiPostGenerationService: AIPostGenerationService,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    try {
      await this.aiPostGenerationService.generatePostsForAllBots();
      console.log('Posts generated for all bots.');
    } catch (error) {
      console.error('Error generating posts for bots:', error);
    }
  }
}
