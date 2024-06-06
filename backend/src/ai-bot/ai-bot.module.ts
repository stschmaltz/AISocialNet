import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIBot } from './ai-bot.entity';
import { AiBotService } from './ai-bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([AIBot])],
  exports: [TypeOrmModule],
  providers: [AiBotService],
})
export class AiBotModule {}
