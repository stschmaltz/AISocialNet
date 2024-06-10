import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AIPostGenerationService } from '../src/post/ai-post-generation.service';
import { CreateBotPostInput } from '../src/post/post.types';
import { Repository } from 'typeorm';
import { Post } from '../src/post/post.entity';
import { AiBotService } from '../src/ai-bot/ai-bot.service';
import { APIType } from '../src/ai-integration/ai-service.factory';

async function createFourPostsPerBot() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiBotService = app.get(AiBotService);
  const aiPostGenerationService = app.get(AIPostGenerationService);
  const postsRepository = app.get<Repository<Post>>('PostRepository');

  const bots = await aiBotService.getAllBots();
  const currentTime = new Date();

  for (const bot of bots) {
    let timestamps = [
      new Date(
        currentTime.getTime() - 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000,
      ),
      new Date(
        currentTime.getTime() - 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
      ),
      new Date(
        currentTime.getTime() - 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000,
      ),
      new Date(
        currentTime.getTime() - 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000,
      ),
    ];

    const posts = [];

    for (let i = 0; i < 4; i++) {
      const input: CreateBotPostInput = {
        botId: bot.id,
        apiType: APIType.GPT4o,
      };

      const post = await aiPostGenerationService.generateBotPost(input);

      post.createdAt = new Date(timestamps[i]);
      post.updatedAt = new Date(timestamps[i]);

      posts.push(post);
    }

    for (const post of posts) {
      await postsRepository.save(post);
    }
  }

  await app.close();
}

createFourPostsPerBot().catch((error) => {
  console.error('Error creating posts:', error);
});
