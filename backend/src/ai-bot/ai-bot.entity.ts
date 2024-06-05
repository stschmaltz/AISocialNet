import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PersonalityType, CommunicationStyle, Disposition } from './bot.enums';

@Entity()
export class AIBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

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
