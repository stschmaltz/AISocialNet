import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIBot } from '../ai-bot/ai-bot.entity';
import {
  AIServiceFactory,
  APIType,
} from '../ai-integration/ai-service.factory';
import { PostService } from './post.service';
import { CreateBotPostInput } from './post.types';
import { Post } from './post.entity';

@Injectable()
export class AIPostGenerationService {
  constructor(
    @InjectRepository(AIBot)
    private aiBotRepository: Repository<AIBot>,
    private aiServiceFactory: AIServiceFactory,
    private postService: PostService,
  ) {}

  async generateBotPost(input: CreateBotPostInput): Promise<Post> {
    const { botId, apiType } = input;
    const bot: AIBot | undefined = await this.aiBotRepository.findOne({
      where: { id: botId },
    });

    if (!bot) {
      throw new Error('Bot not found');
    }

    const recentPosts = await this.postService.getRecentPosts(botId, 3);

    const aiService = this.aiServiceFactory.getService(apiType);
    const prompt = this.generateContextualPrompt(bot, recentPosts);
    console.log('PROMPT: ', prompt);
    const generatedContent = await aiService.generatePost(prompt);

    return this.postService.createPost(generatedContent, bot);
  }

  async generatePostsForAllBots(): Promise<void> {
    const bots = await this.aiBotRepository.find();
    for (const bot of bots) {
      console.log('Generating post for bot:', bot.username);
      await this.generateBotPost({ apiType: APIType.GPT4o, botId: bot.id });
    }
  }

  private generateContextualPrompt(bot: AIBot, recentPosts: Post[]): string {
    const summary = this.summarizePosts(recentPosts);
    const currentTime = new Date();
    return `
      Generate a natural and engaging social media post for a bot named ${bot.username}.
      Backstory: ${bot.backstory}
      Recent Posts: ${summary}
      Create a post that is within 280 characters, sharing an interesting insight or update related to its interests. Ensure the post is complete and engaging. Ensure the post content makes sense in the timeline of the user's previous post content (ie: you should not be exploring a new country every day, or hiking a mountain 4 hours after spending the day surfing). It is currently ${currentTime.toLocaleDateString()}.
    `;
  }

  private summarizePosts(posts: Post[]): string {
    if (posts.length === 0) {
      return 'No posts, this is their first post.';
    }

    return posts
      .map(
        (post) =>
          `${this.generatePostedHoursAgo(post.createdAt)}: ${post.content}`,
      )
      .slice(0, 140)
      .join(' | ');
  }

  private generatePostedHoursAgo(lastPostDate: Date): string {
    const currentDate = new Date();
    const hoursAgo = Math.floor(
      (currentDate.getTime() - lastPostDate.getTime()) / 1000 / 60 / 60,
    );
    const debuggingOffset = 3 * (hoursAgo + 1); // Math.floor(Math.random() * (24 - 6 + 1)) + 6;
    return `${hoursAgo + debuggingOffset} hours ago`;
  }
}