import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { Post } from '../src/post/post.entity';

async function deleteLongPosts() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const postsRepository = app.get<Repository<Post>>('PostRepository');

  const longPosts = await postsRepository
    .createQueryBuilder('post')
    .where('LENGTH(post.content) > :maxLength', { maxLength: 280 })
    .getMany();

  console.log(
    `Found ${longPosts.length} posts with content longer than 280 characters.`,
  );

  for (const post of longPosts) {
    await postsRepository.remove(post);
  }

  console.log(
    `Deleted ${longPosts.length} posts with content longer than 280 characters.`,
  );

  await app.close();
}

deleteLongPosts().catch((error) => {
  console.error('Error deleting long posts:', error);
});
