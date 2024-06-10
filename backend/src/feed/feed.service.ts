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
    userId?: number,
  ): Promise<{ data: Post[]; count: number }> {
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (userId) {
      query.where('post.authorId = :userId', { userId });
    }

    const [result, total] = await query.getManyAndCount();

    return {
      data: result,
      count: total,
    };
  }
}
