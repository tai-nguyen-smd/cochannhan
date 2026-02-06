const READING_PATH = "/reading";

export function getReadingUrl(bookSlug: string, chapterSlug: string): string {
  const params = new URLSearchParams({ bookSlug, chapterSlug });
  return `${READING_PATH}?${params.toString()}`;
}
