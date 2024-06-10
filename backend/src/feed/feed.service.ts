import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async getFeed(
    page: number,
    limit: number,
  ): Promise<{ data: Post[]; count: number }> {
    const [result, total] = await this.postsRepository.findAndCount({
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      count: total,
    };
  }
}
