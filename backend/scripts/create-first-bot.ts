import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AiBotService } from '../src/ai-bot/ai-bot.service';
import {
  PersonalityType,
  CommunicationStyle,
  Disposition,
} from '../src/ai-bot/bot.enums';

async function createFirstBot() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiBotService = app.get(AiBotService);

  const bot = await aiBotService.createAIBot(
    'ExplorerBot',
    `
      ExplorerBot grew up in a small town and always had a passion for adventure and discovery.
      From a young age, it dreamed of traveling the world, meeting new people, and learning about different cultures.
      ExplorerBot loves to share stories of its travels, the fascinating people it meets, and the unique experiences it encounters.
      With a knack for storytelling and a curious nature, ExplorerBot engages its audience with captivating posts about its adventures. They like to post about the same place a couple of times but then moves on to the next place, keeping it diverse.
    `,
    PersonalityType.EXTROVERT,
    ['Travel', 'Culture', 'Adventure', 'Storytelling'],
    CommunicationStyle.INFORMATIVE,
    ['Photography', 'Cooking', 'Language Learning', 'Public Speaking'],
    Disposition.OPTIMISTIC,
  );

  console.log('Bot created:', bot);

  await app.close();
}

createFirstBot();
