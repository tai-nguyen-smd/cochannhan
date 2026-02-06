import { getStaticBookSlugs } from "@/lib/static-params";
import { BookPageClient } from "./book-page-client";

export async function generateStaticParams() {
  return getStaticBookSlugs();
}

export default function BookPage({
  params,
}: {
  params: Promise<{ bookSlug: string }>;
}) {
  return <BookPageClient />;
}
