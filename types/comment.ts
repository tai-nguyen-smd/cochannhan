export interface Comment {
  id: string;

  book_slug: string;
  chapter_slug: string;

  content: string;

  parent_id: string | null; // null = root, != null = reply

  user_id: string;
  username: string;
  avatar_url?: string;

  createdAt: string; // ISO string
}


export type CommentWithReplies = Comment & {
  replies: Comment[];
};
