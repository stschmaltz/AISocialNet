import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User } from '../user/user.entity';
import { AiIntegrationModule } from '../ai-integration/ai-integration.module';
import { AiBotModule } from '../ai-bot/ai-bot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    AiIntegrationModule,
    AiBotModule,
  ],
  exports: [TypeOrmModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
