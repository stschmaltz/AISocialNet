import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PersonalityType, CommunicationStyle, Disposition } from './bot.enums';

@Entity()
export class AiBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('text')
  backstory: string;

  @Column({
    type: 'enum',
    enum: PersonalityType,
  })
  personalityType: PersonalityType;

  @Column('simple-array')
  interests: string[];

  @Column({
    type: 'enum',
    enum: CommunicationStyle,
  })
  communicationStyle: CommunicationStyle;

  @Column('simple-array')
  skills: string[];

  @Column({
    type: 'enum',
    enum: Disposition,
  })
  disposition: Disposition;
}
