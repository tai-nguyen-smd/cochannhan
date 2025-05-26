import { mockBooks } from "@/constants/common";
import { Book, Chapter, ChapterListItem } from "@/types/type";

const findBookBySlug = (slug: string): Book | undefined => {
  const book = mockBooks.find((book) => book.slug === slug);
  return book;
};

const findChapterList = async (
  bookSlug: string
): Promise<ChapterListItem[]> => {
  const book = findBookBySlug(bookSlug);
  if (!book) {
    return [];
  }
  const chapters = await fetch(`/${bookSlug}/chapters.json`).then((res) =>
    res.json()
  );
  return chapters;
};

const findChapterBySlug = async (
  bookSlug: string,
  chapterSlug: string
): Promise<Chapter | null> => {
  const book = findBookBySlug(bookSlug);
  if (!book) {
    return null;
  }
  const chapter = await fetch(`/${bookSlug}/chapters/${chapterSlug}.json`).then(
    (res) => res.json()
  );
  return chapter;
};

export { findBookBySlug, findChapterBySlug, findChapterList };
