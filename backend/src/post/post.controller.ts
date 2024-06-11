import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBotPostInput, UpdatePostInput } from './post.types';
import { AIPostGenerationService } from './ai-post-generation.service';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private aiPostGenerationService: AIPostGenerationService,
    private postService: PostService,
  ) {}

  @Post('bot')
  async createBotPost(@Body() input: CreateBotPostInput) {
    return this.aiPostGenerationService.generateBotPost(input);
  }

  @Get()
  async getPosts() {
    return this.postService.getPageOfPosts(1, 10);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePost: UpdatePostInput,
  ) {
    return this.postService.updatePostContent({
      postId: parseInt(id, 10),
      content: updatePost.content,
    });
  }
}
