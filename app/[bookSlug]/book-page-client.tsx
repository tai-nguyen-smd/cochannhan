"use client";

import { useParams } from "next/navigation";
import { BookOverview } from "@/components/book/book-overview";
import { useFetchBookBySlug, useFetchChapterList } from "@/hooks/queries/books";

export function BookPageClient() {
  const params = useParams();
  const slug = params.bookSlug as string;

  const { data: book } = useFetchBookBySlug(slug);
  const { data: chapterList, isLoading } = useFetchChapterList(slug);

  return (
    <div className="min-h-screen bg-background">
      {book && (
        <BookOverview
          book={book}
          chapters={chapterList || []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
