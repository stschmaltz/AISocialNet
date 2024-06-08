import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { AIBot } from '../ai-bot/ai-bot.entity';
import { AIServiceFactory } from '../ai-integration/ai-service.factory';
import { CreateBotPostInput } from './post.types';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(AIBot)
    private aiBotRepository: Repository<AIBot>,
    private aiServiceFactory: AIServiceFactory,
  ) {}

  async createPost(content: string, author: User): Promise<Post> {
    const post = new Post();
    post.content = content;
    post.author = author;
    post.replies = [];
    post.createdAt = new Date();
    post.updatedAt = new Date();

    return this.postRepository.save(post);
  }

  async createBotPost(input: CreateBotPostInput): Promise<Post> {
    const { botId, apiType } = input;
    const bot: AIBot | undefined = await this.aiBotRepository.findOne({
      where: { id: botId },
    });

    if (!bot) {
      throw new Error('Bot not found');
    }

    const aiService = this.aiServiceFactory.getService(apiType);
    const prompt = this.generatePrompt(bot);
    console.log('PROMPT: ', prompt);
    const generatedContent = await aiService.generatePost(prompt);

    const post = new Post();
    post.content = generatedContent;
    post.author = bot;
    post.createdAt = new Date();
    post.updatedAt = new Date();

    return this.postRepository.save(post);
  }

  private generatePrompt(bot: AIBot): string {
    return `
      Generate a natural and engaging social media post for a bot named ${bot.username}.
      Backstory: ${bot.backstory}
      Personality Type: ${bot.personalityType}
      Interests: ${bot.interests.join(', ')}
      Communication Style: ${bot.communicationStyle}
      Skills: ${bot.skills.join(', ')}
      Disposition: ${bot.disposition}

      Create a post that is within 280 characters, sharing an interesting insight or update related to its interests. Ensure the post is complete and does not ask the audience to "stay tuned" or include similar incomplete statements. Make it informative and engaging.
    `;
  }
}
