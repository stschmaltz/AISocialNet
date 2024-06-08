import { Body, Controller, Post } from '@nestjs/common';
import { CreateBotPostInput } from './post.types';
import { AIPostGenerationService } from './ai-post-generation.service';

@Controller('post')
export class PostController {
  constructor(private postService: AIPostGenerationService) {}

  @Post('bot')
  async createBotPost(@Body() input: CreateBotPostInput) {
    return this.postService.generateBotPost(input);
  }
}
