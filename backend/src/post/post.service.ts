import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Post } from './post.entity';
import { CreatePostInput } from './post.types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository   (Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(input: CreatePostInput) {
    const { authorId, title, content, parentPostId } = input;
    const author = await this.userRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new Error('Author not found');
    }

    const parentPost = parentPostId
      ? await this.postRepository.findOne({ where: { id: parentPostId } })
      : null;

    const post = this.postRepository.create({
      author,
      title,
      content,
      parentPost,
    });

    return this.postRepository.save(post);
  }
}
