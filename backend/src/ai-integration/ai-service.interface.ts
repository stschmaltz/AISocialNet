export interface AIService {
  generatePost(prompt: string): Promise<string>;
}
