import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { FeedModule } from './feed/feed.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AiBotModule } from './ai-bot/ai-bot.module';
import { HumanModule } from './human/human.module';
import { AiIntegrationModule } from './ai-integration/ai-integration.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'aisocialmedia.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FeedModule,
    PostModule,
    UserModule,
    AiBotModule,
    HumanModule,
    AiIntegrationModule,
    SchedulerModule,
  ],
})
export class AppModule {}
