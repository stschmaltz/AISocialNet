import { AppDataSource } from '../src/migrations/data-source';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Post } from '../src/post/post.entity';
import { exit } from 'process';

async function deleteEmptyPosts() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postsRepository = app.get<Repository<Post>>('PostRepository');

  try {
    const emptyPosts = await postsRepository.find();

    if (emptyPosts.length === 0) {
      console.log('No empty posts found.');
      return;
    }

    for (const post of emptyPosts) {
      await postsRepository.remove(post);
      console.log(`Deleted post with id: ${post.id}`);
    }

    console.log('Empty posts deleted successfully.');
  } catch (error) {
    console.error('An error occurred while deleting empty posts:', error);
  }
}

async function deleteNewestPost() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postsRepository = app.get<Repository<Post>>('PostRepository');

  try {
    const newestPost = await postsRepository.findOne({
      where: {
        id: 262,
      },
    });

    if (!newestPost) {
      console.log('No posts found.');
      return;
    }

    await postsRepository.remove(newestPost);
    console.log(`Deleted post with id: ${newestPost.id}`);

    console.log('Newest post deleted successfully.');
  } catch (error) {
    console.error('An error occurred while deleting newest post:', error);
  }

  exit(0);
}

deleteNewestPost();
