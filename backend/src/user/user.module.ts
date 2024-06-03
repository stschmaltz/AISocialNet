import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Human } from '../human/human.entity';
import { AIBot } from '../ai-bot/ai-bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Human, AIBot])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
