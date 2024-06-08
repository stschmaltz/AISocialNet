import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateBotPostInput } from './post.types';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  // create bot post
  @Post('bot')
  async createBotPost(@Body() input: CreateBotPostInput) {
    return this.postService.createBotPost(input);
  }
  // POST /post/bot
}
