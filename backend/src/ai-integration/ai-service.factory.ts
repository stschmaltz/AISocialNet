import { Injectable, Inject } from '@nestjs/common';
import { GPTService } from './gpt/gpt.service';
import { AIService } from './ai-service.interface';

export enum APIType {
  GPT4o = 'GPT4o',
}

@Injectable()
export class AIServiceFactory {
  constructor(@Inject(GPTService) private readonly gptService: GPTService) {}

  getService(apiType: APIType): AIService {
    switch (apiType) {
      case APIType.GPT4o:
        return this.gptService;
      default:
        throw new Error('Unsupported API type');
    }
  }
}
