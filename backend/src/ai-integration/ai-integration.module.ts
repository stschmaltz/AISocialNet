import { Module } from '@nestjs/common';
import { GPTService } from './gpt/gpt.service';
import { AIServiceFactory } from './ai-service.factory';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GPTService, AIServiceFactory],
  exports: [GPTService, AIServiceFactory],
})
export class AiIntegrationModule {}
