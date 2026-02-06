"use client";

import { useParams } from "next/navigation";
import { BookOverview } from "@/components/book/book-overview";
import { useFetchBookBySlug, useFetchChapterList } from "@/hooks/queries/books";
import { useMounted } from "@/hooks/use-mounted";
import Loading from "@/app/loading";

export function BookPageClient() {
  const params = useParams();
  const slug = params.bookSlug as string;
  const mounted = useMounted();



  const { data: book } = useFetchBookBySlug(slug);
  const { data: chapterList, isLoading } = useFetchChapterList(slug);
  if (!mounted) {
    return <Loading />;
  }
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
