import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PostService } from '../src/post/post.service';
import { AiBotService } from '../src/ai-bot/ai-bot.service';
import { APIType } from '../src/ai-integration/ai-service.factory';
import { AIPostGenerationService } from '../src/post/ai-post-generation.service';

async function createFirstPost() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postService = app.get(AIPostGenerationService);
  const aiBotService = app.get(AiBotService);
  const bot = await aiBotService.findByName('ExplorerBot');
  if (!bot) {
    console.log('Bot not found');
    await app.close();
    return;
  }

  const post = await postService.generateBotPost({
    botId: bot.id,
    apiType: APIType.GPT4o,
  });

  console.log('Post created:', post);

  await app.close();
}

createFirstPost().catch((error) => console.error(error));
