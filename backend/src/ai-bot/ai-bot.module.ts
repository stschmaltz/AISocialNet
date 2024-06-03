import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIBot } from './ai-bot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AIBot])],
  exports: [TypeOrmModule],
})
export class AiBotModule {}
