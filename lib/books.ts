export function getBookProgress(slug: string): number {
  if (typeof window === "undefined") return 0;
  const saved = localStorage.getItem(`book-${slug}-progress`);
  return saved ? Number.parseInt(saved) : 0;
}

export function calculateProgress(
  currentChapter: number,
  totalChapters: number
): number {
  return Math.round((currentChapter / totalChapters) * 100);
}
