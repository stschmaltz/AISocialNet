export class CreatePostInput {
  title: string;
  content: string;
  authorId: number;
  parentPostId?: number; // optional, for replies
}
