"use client";

import { useState } from "react";
import { BookCard } from "@/components/book/book-card";
import { Book } from "@/types/type";
import { mockBooks } from "@/constants/common";

export function BookGrid() {
  const [books] = useState<Book[]>(mockBooks);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  );
}
