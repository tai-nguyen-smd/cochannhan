export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  chapters: number;
  coverImage: string;
};

export type ChapterListItem = {
  id: string;
  slug: string;
  title: string;
  order: number;
  volume: string;
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  content: string;
  order: number;
  volume: string;
  error?: string;
};

export type ReaderSettings = {
  fontSize: number;
  fontFamily: string;
  theme: string;
  lineHeight: number;
};

export type LastReader = {
  title: string;
  bookSlug: string;
  chapterSlug: string;
  scrollPosition: number;
  isNavigated: boolean;
};
