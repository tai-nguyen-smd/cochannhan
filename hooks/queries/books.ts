"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_TIME } from "./cache.const";
import { bookService } from "@/services/book.service";

// Query keys constants
const BOOK_QUERY_KEYS = {
  all: ["books"] as const,
  lists: () => [...BOOK_QUERY_KEYS.all, "list"] as const,
  detail: (slug: string) => ["book", slug] as const,
  chapters: {
    all: (bookSlug: string) => ["chapters", bookSlug] as const,
    detail: (bookSlug: string, chapterSlug: string) =>
      ["chapter", bookSlug, chapterSlug] as const,
    data: (bookSlug: string, chapterSlug: string) =>
      ["chapterData", bookSlug, chapterSlug] as const,
  },
} as const;

// 1. Fetch tất cả Books
export const useFetchAllBooks = () =>
  useQuery({
    queryKey: BOOK_QUERY_KEYS.all,
    queryFn: () => bookService.findAllBooks(),
    staleTime: CACHE_TIME.SIX_HOURS,
    gcTime: CACHE_TIME.SIX_HOURS,
  });

// 2. Fetch Book theo slug
export const useFetchBookBySlug = (slug: string) =>
  useQuery({
    queryKey: BOOK_QUERY_KEYS.detail(slug),
    queryFn: () => bookService.fetchBookBySlug(slug),
    staleTime: CACHE_TIME.SIX_HOURS,
    gcTime: CACHE_TIME.SIX_HOURS,
  });

// 3. Fetch ChapterList
export const useFetchChapterList = (bookSlug: string) =>
  useQuery({
    queryKey: BOOK_QUERY_KEYS.chapters.all(bookSlug),
    queryFn: () => bookService.fetchChapterList(bookSlug),
    staleTime: CACHE_TIME.PERMANENT,
    gcTime: CACHE_TIME.PERMANENT,
  });

// 4. Fetch Chapter theo slug
export const useFetchChapterBySlug = (bookSlug: string, chapterSlug: string) =>
  useQuery({
    queryKey: BOOK_QUERY_KEYS.chapters.detail(bookSlug, chapterSlug),
    queryFn: () => bookService.fetchChapterBySlug(bookSlug, chapterSlug),
    staleTime: CACHE_TIME.PERMANENT,
    gcTime: CACHE_TIME.PERMANENT,
  });

// 5. Fetch Chapter + prev/next - TỐI ƯU HÓA
export const useFetchChapterData = (bookSlug: string, chapterSlug: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: BOOK_QUERY_KEYS.chapters.data(bookSlug, chapterSlug),
    queryFn: async () => {
      try {
        const chapterList = await queryClient.ensureQueryData({
          queryKey: BOOK_QUERY_KEYS.chapters.all(bookSlug),
          queryFn: () => bookService.fetchChapterList(bookSlug),
          staleTime: CACHE_TIME.PERMANENT, 
        });

        // 2. Lấy current chapter từ cache hoặc fetch
        const currentChapter = await queryClient.ensureQueryData({
          queryKey: BOOK_QUERY_KEYS.chapters.detail(bookSlug, chapterSlug),
          queryFn: () => bookService.fetchChapterBySlug(bookSlug, chapterSlug),
          staleTime: CACHE_TIME.PERMANENT,
        });

        if (!currentChapter) {
          return { currentChapter: null, prevMeta: null, nextMeta: null };
        }

        // 3. Tìm prev/next chapter metadata
        const currentOrder = Number(currentChapter.order);
        const prevMeta = chapterList.find((c) => c.order === currentOrder - 1);
        const nextMeta = chapterList.find((c) => c.order === currentOrder + 1);

        return {
          currentChapter,
          prevMeta,
          nextMeta,
        };
      } catch (error) {
        console.error("Error fetching chapter data:", error);
        throw error;
      }
    },
    staleTime: CACHE_TIME.PERMANENT, 
    gcTime: CACHE_TIME.PERMANENT,
    // Thêm retry logic nếu cần
    retry: 0,
  });
};
