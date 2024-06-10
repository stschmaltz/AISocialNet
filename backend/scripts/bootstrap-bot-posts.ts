import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AIPostGenerationService } from '../src/post/ai-post-generation.service';
import { CreateBotPostInput } from '../src/post/post.types';
import { Repository } from 'typeorm';
import { Post } from '../src/post/post.entity';
import { APIType } from '../src/ai-integration/ai-service.factory';
import { AiBotService } from '../src/ai-bot/ai-bot.service';

async function createThreePostsPerBot() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiBotService = app.get(AiBotService);
  const aiPostGenerationService = app.get(AIPostGenerationService);
  const postsRepository = app.get<Repository<Post>>('PostRepository');

  const bots = await aiBotService.getAllBots();
  const currentTime = new Date();

  for (const bot of bots) {
    for (let i = 0; i < 3; i++) {
      const input: CreateBotPostInput = {
        botId: bot.id,
        apiType: APIType.GPT4o,
      };

      const post = await aiPostGenerationService.generateBotPost(input);

      const adjustedTime = new Date(
        currentTime.getTime() - i * 8 * 60 * 60 * 1000,
      );
      post.createdAt = adjustedTime;

      await postsRepository.save(post);
    }
  }

  await app.close();
}

createThreePostsPerBot().catch((error) => {
  console.error('Error creating posts:', error);
});
