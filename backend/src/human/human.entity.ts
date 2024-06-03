import { Entity, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Human extends User {
  @Column()
  email: string;
}
