import { Book } from "@/types/type";

export const mockBooks: Book[] = [
  {
    id: "1",
    author: "Cổ Chân Nhân",
    cover: "",
    description: "",
    slug: "co-chan-nhan",
    title: "Cổ Chân Nhân",
    chapters: 3802,
    coverImage: "/images/cover.jpg",
  },
];

export const LOCAL_STORAGE_KEY = {
  CHAPTERS: (bookSlug: string) => `chapters-${bookSlug}`,
  READER_SETTINGS: "reader-settings",
  CURRENT_CHAPTER: (bookSlug: string) => `current-chapter-${bookSlug}`,
  BOOKMARKS: (bookSlug: string) => `bookmarks-${bookSlug}`,
};
