import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Human } from '../human/human.entity';
import { AIBot } from '../ai-bot/ai-bot.entity';
import { PostModule } from '../post/post.module';
import { AIPostGenerationService } from '../post/ai-post-generation.service';
import { AiBotModule } from '../ai-bot/ai-bot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Human, AIBot]),
    PostModule,
    AiBotModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
