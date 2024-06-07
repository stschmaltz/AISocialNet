import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AIService } from '../ai-service.interface';

export interface GPTResponse {
  choices: Array<{
    text: string;
  }>;
}

@Injectable()
export class GPTService implements AIService {
  private url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  private apiKey = '';

  constructor(private readonly httpService: HttpService) {
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  async generatePost(prompt: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post<GPTResponse>(
        this.url,
        {
          //TODO: Parameterize these variables
          prompt,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        },
      ),
    );

    return response.data.choices[0].text.trim();
  }
}
