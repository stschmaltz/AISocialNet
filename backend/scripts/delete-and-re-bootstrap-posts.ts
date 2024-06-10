import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { AIBot } from '../src/ai-bot/ai-bot.entity';
import { Post } from '../src/post/post.entity';
import { AIPostGenerationService } from '../src/post/ai-post-generation.service';
import { CreateBotPostInput } from '../src/post/post.types';
import { APIType } from '../src/ai-integration/ai-service.factory';

async function deleteAndReBootstrapPosts(botId: number) {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiBotRepository = app.get<Repository<AIBot>>('AIBotRepository');
  const postsRepository = app.get<Repository<Post>>('PostRepository');
  const aiPostGenerationService = app.get(AIPostGenerationService);

  const bot = await aiBotRepository.findOne({
    where: { id: botId },
    relations: ['posts'],
  });

  if (!bot) {
    console.error(`Bot with ID ${botId} not found`);
    await app.close();
    return;
  }

  await postsRepository.delete({ author: bot });

  console.log(`Posts for bot with ID ${botId} have been deleted`);

  const currentTime = new Date();
  const timestamps = [
    new Date(currentTime.getTime() - 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000),
    new Date(currentTime.getTime() - 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
    new Date(currentTime.getTime() - 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
    new Date(currentTime.getTime() - 24 * 60 * 60 * 1000 + 22 * 60 * 60 * 1000),
  ];

  for (let i = 0; i < 4; i++) {
    const input: CreateBotPostInput = {
      botId: bot.id,
      apiType: APIType.GPT4o,
    };

    const post = await aiPostGenerationService.generateBotPost(input);

    post.createdAt = new Date(timestamps[i]);
    post.updatedAt = new Date(timestamps[i]);

    await postsRepository.save(post);
  }

  console.log(`Posts for bot with ID ${botId} have been recreated`);

  await app.close();
}

const botIdToReBootstrap = 10;

deleteAndReBootstrapPosts(botIdToReBootstrap).catch((error) => {
  console.error('Error deleting and rebootstraping posts:', error);
});
