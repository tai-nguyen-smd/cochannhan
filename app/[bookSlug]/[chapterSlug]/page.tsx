import { getStaticChapterParamsForBook } from "@/lib/static-params";
import { ChapterPageClient } from "./chapter-page-client";
import { mockBooks } from "@/constants/common";


export async function generateStaticParams() {
  const results = await Promise.all(
    mockBooks.map(async (book) => {
      return getStaticChapterParamsForBook(book.slug)
    })
  );

  return results.flat();
}


export default function ChapterPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}) {
  return <ChapterPageClient />;
}
