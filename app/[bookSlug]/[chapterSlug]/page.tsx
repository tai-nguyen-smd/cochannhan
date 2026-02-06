import { redirect } from "next/navigation";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}) {
  const { bookSlug, chapterSlug } = await params;
  redirect(`/reading?bookSlug=${encodeURIComponent(bookSlug)}&chapterSlug=${encodeURIComponent(chapterSlug)}`);
}
