import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIBot } from './ai-bot.entity';
import { AiBotService } from './ai-bot.service';

@Module({
  imports: [TypeOrmModule.forFeature([AIBot])],
  providers: [AiBotService],
  exports: [TypeOrmModule, AiBotService],
})
export class AiBotModule {}
