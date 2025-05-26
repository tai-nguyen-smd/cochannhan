"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { BookOverview } from "@/components/book/book-overview";
import { useServices } from "@/hooks/use-services";

export default function BookPage() {
  const params = useParams();
  const slug = params.bookSlug as string;

  const { book, chapterList, loading } = useServices(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {book && <BookOverview book={book} chapters={chapterList} />}
    </div>
  );
}
