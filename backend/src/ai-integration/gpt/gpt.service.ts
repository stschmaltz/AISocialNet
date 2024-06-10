import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AIService } from '../ai-service.interface';

interface GPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

@Injectable()
export class GPTService implements AIService {
  private readonly API_KEY = process.env.OPENAI_API_KEY;
  private readonly API_URL = 'https://api.openai.com/v1/chat/completions';

  constructor(private readonly httpService: HttpService) {}

  async generatePost(prompt: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post<GPTResponse>(
        this.API_URL,
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that generates realistic and engaging social media posts in a "twitter-like" style. Do not start tweets with "Just".',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 350,
          n: 1,
          top_p: 1,
          temperature: 1.3,
          presence_penalty: 1.5,
        },
        {
          headers: { Authorization: `Bearer  ${this.API_KEY}` },
        },
      ),
    );

    const postContent = response.data.choices[0].message.content.trim();
    return postContent;
  }
}
