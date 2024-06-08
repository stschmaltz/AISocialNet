import { Injectable, Inject } from '@nestjs/common';
import { GPTService } from './gpt/gpt.service';
import { AIService } from './ai-service.interface';

export enum APIType {
  GPT = 'GPT',
}

@Injectable()
export class AIServiceFactory {
  constructor(@Inject(GPTService) private readonly gptService: GPTService) {}

  getService(apiType: APIType): AIService {
    switch (apiType) {
      case APIType.GPT:
        return this.gptService;
      default:
        throw new Error('Unsupported API type');
    }
  }
}
