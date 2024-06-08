import { APIType } from '../ai-integration/ai-service.factory';

export interface CreateBotPostInput {
  botId: number;
  apiType: APIType;
}
