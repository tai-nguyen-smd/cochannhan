"use client"

import { useState, useEffect } from "react"
import { BookCard } from "@/components/book-card"
import { getAllBooks, calculateProgress } from "@/lib/books"
import { Skeleton } from "@/components/ui/skeleton"

interface BookWithProgress {
  id: string
  slug: string
  title: string
  author: string
  cover: string
  description: string
  progress: number
  chapters: number
}

export function BookGrid() {
  const [books, setBooks] = useState<BookWithProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await getAllBooks()

        // Add progress and chapter count for each book
        const booksWithProgress = booksData.map((book) => ({
          ...book,
          progress: calculateProgress(book.slug),
          chapters: getChapterCount(book.slug), // You'll need to implement this
        }))

        setBooks(booksWithProgress)
      } catch (error) {
        console.error("Error loading books:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [])

  // Helper function to get chapter count (you can move this to books.ts)
  const getChapterCount = (slug: string): number => {
    const chapterCounts: Record<string, number> = {
      "toi-thay-hoa-vang-tren-co-xanh": 5,
      "de-men-phieu-luu-ky": 2,
      "so-do": 1,
      "chi-pheo": 1,
    }
    return chapterCounts[slug] || 0
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {books.map((book) => (
        <BookCard key={book.slug} book={book} />
      ))}
    </div>
  )
}
