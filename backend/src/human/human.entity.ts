import { Column, ChildEntity } from 'typeorm';
import { User } from '../user/user.entity';

@ChildEntity()
export class Human extends User {
  @Column({ unique: true })
  email: string;
}
