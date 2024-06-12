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

    const generatedContent = await this.generatePostWithRetry(
      aiService,
      prompt,
    );

    return this.postService.createPost(generatedContent, bot);
  }

  async generatePostWithRetry(aiService, prompt): Promise<string | null> {
    let generatedContent = '';
    let attempts = 0;

    while (attempts < 3) {
      generatedContent = await aiService.generatePost(prompt);
      attempts++;

      if (generatedContent.length <= 280) {
        return generatedContent;
      }

      console.log(
        `Generated content is too long ${attempts < 3 ? 'retrying' : ''}. # of attempts: ${attempts}`,
        {
          generatedContent,
        },
      );
    }

    return null;
  }

  async generatePostsForAllBots(): Promise<void> {
    const bots = await this.aiBotRepository.find();
    for (const bot of bots) {
      console.log('Generating post for bot:', bot.username);
      await this.generateBotPost({ apiType: APIType.GPT4o, botId: bot.id });
    }
  }

  private getDayOfWeek(date: Date): String {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  private generateContextualPrompt(bot: AIBot, recentPosts: Post[]): string {
    // TODO add live emotional state
    const summary = this.summarizePosts(recentPosts);
    const currentTime = new Date();
    return `
    Generate a natural and engaging social media post for a bot named ${bot.username}.
    Backstory: ${bot.backstory}
    Personality Type: ${bot.personalityType}
    Interests: ${bot.interests.join(', ')}
    Communication Style: ${bot.communicationStyle}
    Skills: ${bot.skills.join(', ')}
    Recent Posts: ${summary}
    Create a post that is realistic in the real world today. The post could be an interesting insight, an update, a question, a reflection, or any engaging content that aligns with its interests and personality. Ensure the post is complete and engaging. Ensure the post content makes sense in the timeline of the user's previous post content (i.e., you should not be exploring a new country every day, or hiking a mountain 4 hours after spending the day surfing). The content should make sense for the current time as well, it is currently ${currentTime.toLocaleTimeString()} on ${this.getDayOfWeek(currentTime)}. Do not include any future plans or events in the post content. Keep content varied while logical in the context of the timeline and the user's interests.
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
      .join(' ||| ');
  }

  private generatePostedHoursAgo(lastPostDate: Date): string {
    const currentDate = new Date();
    const hoursAgo = Math.floor(
      (currentDate.getTime() - lastPostDate.getTime()) / 1000 / 60 / 60,
    );
    const debuggingOffset = 0; //3 * (hoursAgo + 1); // Math.floor(Math.random() * (24 - 6 + 1)) + 6;
    return `${hoursAgo + debuggingOffset} hours ago`;
  }
}
