"use client";

import type { Book, Chapter, ChapterListItem } from "@/types/type";
import { mockBooks } from "@/constants/common";
import { IBookService } from "./interfaces/i-book.interface";

const SUPABASE_STORAGE_URL = 'https://uenyspihbfhpcgdkhceb.supabase.co/storage/v1/object/public/cochannhan-reader'
export class BookService implements IBookService {
  constructor() {}

  findAllBooks(): Array<Book> {
    return mockBooks;
  }

  fetchBookBySlug = (slug: string): Book | undefined => {
    return mockBooks.find((b) => b.slug === slug);
  };

  fetchChapterList = async (
    bookSlug: string
  ): Promise<Array<ChapterListItem>> => {
    const book = this.fetchBookBySlug(bookSlug);
    if (!book) {
      return [];
    }
    const chapters = await fetch(`${SUPABASE_STORAGE_URL}/${book.slug}/chapters.json`).then((res) =>
      res.json()
    );
    return chapters;
  };

  fetchChapterBySlug = async (
    bookSlug: string,
    chapterSlug: string
  ): Promise<Chapter | null> => {
    const book = this.fetchBookBySlug(bookSlug);
    if (!book) {
      return null;
    }
    const chapter = await fetch(
      `${SUPABASE_STORAGE_URL}/${book.slug}/chapters/${chapterSlug}.json`
    ).then((res) => res.json());
    return chapter;
  };
}

export const bookService = new BookService();
