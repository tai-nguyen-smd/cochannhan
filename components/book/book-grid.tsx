"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/book/book-card";
import { Book, LastReader } from "@/types/type";
import { LOCAL_STORAGE_KEY, mockBooks } from "@/constants/common";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/components/confirmation-dialog";

export function BookGrid() {
  const router = useRouter();
  const [books] = useState<Book[]>(mockBooks);
  const [showDialog, setShowDialog] = useState(false);

  const [lastReader] = useLocalStorage<LastReader | null>(
    LOCAL_STORAGE_KEY.LAST_READER,
    null
  );
  useEffect(() => {
    if (lastReader) {
      setShowDialog(true);
    }
  }, [lastReader]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
      <ConfirmationDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={() =>
          router.push(`/${lastReader?.bookSlug}/${lastReader?.chapterSlug}`)
        }
        title="Đi tới trang đọc"
        description={`Bạn có muốn chuyển tới ${lastReader?.title} không?`}
      />
    </>
  );
}
