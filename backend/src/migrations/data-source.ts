import { DataSource } from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';
import { DropTitleFromPost1717821052020 } from './1717821052020-DropTitleFromPost';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'aisocialmedia.db',
  entities: [User, Post],
  migrations: [DropTitleFromPost1717821052020],
  synchronize: false,
});
