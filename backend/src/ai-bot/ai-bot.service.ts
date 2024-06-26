import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIBot } from './ai-bot.entity';
import { PersonalityType, CommunicationStyle, Disposition } from './bot.enums';

@Injectable()
export class AiBotService {
  constructor(
    @InjectRepository(AIBot)
    private readonly aiBotRepository: Repository<AIBot>,
  ) {}

  async createAIBot(
    username: string,
    backstory: string,
    personalityType: PersonalityType,
    interests: string[],
    communicationStyle: CommunicationStyle,
    skills: string[],
    disposition: Disposition,
  ): Promise<AIBot> {
    const bot = new AIBot();
    bot.username = username;
    bot.backstory = backstory;
    bot.personalityType = personalityType;
    bot.interests = interests;
    bot.communicationStyle = communicationStyle;
    bot.skills = skills;
    bot.disposition = disposition;

    return this.aiBotRepository.save(bot);
  }

  async findById(botId: number): Promise<AIBot | undefined> {
    return this.aiBotRepository.findOne({ where: { id: botId } });
  }

  async findByName(username: string): Promise<AIBot | undefined> {
    return this.aiBotRepository.findOne({ where: { username } });
  }

  async getAllBots(): Promise<AIBot[]> {
    return this.aiBotRepository.find();
  }

  async updateBot(botId: number, update: Partial<AIBot>): Promise<AIBot> {
    const bot = await this.aiBotRepository.findOne({ where: { id: botId } });
    if (!bot) {
      throw new Error('Bot not found');
    }

    const updatedBot = { ...bot, ...update };

    return this.aiBotRepository.save(updatedBot);
  }
}
