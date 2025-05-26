import { Header } from "@/components/layout/header";
import { BookGrid } from "@/components/book/book-grid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Cổ Chân Nhân</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Khám phá thế giới tri thức qua từng trang sách
          </p>
        </div>
        <div className="p-4 sm:p-10">
          <BookGrid />
        </div>
      </main>
    </div>
  );
}
