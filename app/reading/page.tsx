import { Suspense } from "react";
import { ReadingPageClient } from "@/app/reading/reading-page-client";
import Loading from "@/app/loading";

export default function ReadingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ReadingPageClient />
    </Suspense>
  );
}
