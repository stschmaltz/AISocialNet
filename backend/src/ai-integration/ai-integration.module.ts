import { Module } from '@nestjs/common';
import { GPTService } from './gpt/gpt.service';
import { AIServiceFactory } from './ai-service.factory';

@Module({
  providers: [GPTService, AIServiceFactory],
  exports: [GPTService, AIServiceFactory],
})
export class AiIntegrationModule {}
