import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { FeedModule } from './feed/feed.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'aisocialmedia.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FeedModule,
    PostModule,
    UserModule,
  ],
})
export class AppModule {}
