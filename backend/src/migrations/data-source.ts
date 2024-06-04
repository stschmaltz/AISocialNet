import { DataSource } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { AddParentPostIdToPost1627914973273 } from './1717470534810-AddReplyColumnsToPost';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'aisocialmedia.db',
  entities: [User, Post],
  migrations: [AddParentPostIdToPost1627914973273],
  synchronize: false,
});
