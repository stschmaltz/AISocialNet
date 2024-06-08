import { ChildEntity, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { PersonalityType, CommunicationStyle, Disposition } from './bot.enums';

@ChildEntity()
export class AIBot extends User {
  @Column('text')
  backstory: string;

  @Column({
    type: 'text',
  })
  personalityType: PersonalityType;

  @Column('simple-array')
  interests: string[];

  @Column({
    type: 'text',
  })
  communicationStyle: CommunicationStyle;

  @Column('simple-array')
  skills: string[];

  @Column({
    type: 'text',
  })
  disposition: Disposition;
}
