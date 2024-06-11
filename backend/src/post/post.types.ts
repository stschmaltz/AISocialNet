import { APIType } from '../ai-integration/ai-service.factory';

export interface CreateBotPostInput {
  botId: number;
  apiType: APIType;
}

export interface UpdatePostInput {
  postId: number;
  content: string;
}
