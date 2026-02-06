import { readFileSync, existsSync } from "fs";
import path from "path";
import { mockBooks } from "@/constants/common";
import type { ChapterListItem } from "@/types/type";

/**
 * Server-only: get all book slugs for generateStaticParams.
 * Used at build time for static export.
 */
export function getStaticBookSlugs(): Array<{ bookSlug: string }> {
  return mockBooks.map((b) => ({ bookSlug: b.slug }));
}

/**
 * Server-only: get chapter slugs for a book by reading public/<bookSlug>/chapters.json.
 * Used at build time for generateStaticParams([chapterSlug]). Parent segment provides bookSlug.
 */
export function getStaticChapterParamsForBook(
  bookSlug: string
): Array<{ bookSlug: string; chapterSlug: string }> {
  if (!bookSlug || typeof bookSlug !== "string") {
    return [];
  }
  const filePath = path.join(
    process.cwd(),
    "public",
    bookSlug,
    "chapters.json"
  );
  if (!existsSync(filePath)) {
    return [];
  }
  const content = readFileSync(filePath, "utf-8");
  const chapters: ChapterListItem[] = JSON.parse(content);
  return chapters.map((c) => ({ bookSlug, chapterSlug: c.slug }));
}
