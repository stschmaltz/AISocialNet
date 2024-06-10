import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { AIBot } from '../src/ai-bot/ai-bot.entity';
import { Post } from '../src/post/post.entity';

async function deleteBotAndPosts(botId: number) {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiBotRepository = app.get<Repository<AIBot>>('AIBotRepository');
  const postsRepository = app.get<Repository<Post>>('PostRepository');

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

  await aiBotRepository.delete(botId);

  console.log(`Bot with ID ${botId} and its posts have been deleted`);

  await app.close();
}

const botIdToDelete = 11;

deleteBotAndPosts(botIdToDelete).catch((error) => {
  console.error('Error deleting bot and posts:', error);
});
