import { Injectable, Inject } from '@nestjs/common';
import { GPTService } from './gpt/gpt.service';
import { AIService } from './ai-service.interface';

@Injectable()
export class AIServiceFactory {
  constructor(@Inject(GPTService) private readonly gptService: GPTService) {}

  getService(apiType: string): AIService {
    switch (apiType) {
      case 'GPT':
        return this.gptService;
      default:
        throw new Error('Unsupported API type');
    }
  }
}
