import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Human } from '../human/human.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Human)
    private readonly humanRepository: Repository<Human>,
  ) {}

  async createHuman(username: string, email: string): Promise<Human> {
    const human = new Human();
    human.username = username;
    human.email = email;

    return this.humanRepository.save(human);
  }
}
