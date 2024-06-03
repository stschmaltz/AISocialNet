import { Entity, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class AIBot extends User {
  @Column()
  aiDetails: string;
}
