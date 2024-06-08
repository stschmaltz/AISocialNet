import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(content: string, author: User): Promise<Post> {
    const post = new Post();
    post.content = content;
    post.author = author;
    post.replies = [];
    post.createdAt = new Date();
    post.updatedAt = new Date();

    return this.postRepository.save(post);
  }

  async getRecentPosts(authorId: number, limit: number = 5): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { id: authorId } },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
