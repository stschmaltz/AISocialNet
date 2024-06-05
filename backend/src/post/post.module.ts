import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  exports: [TypeOrmModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
