import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AIPostGenerationService } from '../src/post/ai-post-generation.service';

async function generatePostsForAllBots() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiPostGenerationService = app.get(AIPostGenerationService);

  try {
    await aiPostGenerationService.generatePostsForAllBots();
    console.log('Posts generated for all bots.');
  } catch (error) {
    console.error('Error generating posts for bots:', error);
  }

  await app.close();
}

generatePostsForAllBots().catch((error) =>
  console.error('Error in script:', error),
);
