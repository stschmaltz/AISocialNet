import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostInput } from './post.types';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() input: CreatePostInput) {
    return this.postService.createPost(input);
  }
}
