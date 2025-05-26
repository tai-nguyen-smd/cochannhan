"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { BookOverview } from "@/components/book/book-overview"
import { getBookBySlug } from "@/lib/books"

export default function BookPage() {
  const params = useParams()
  const slug = params.slug as string
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true)
        const bookData = await getBookBySlug(slug)
        setBook(bookData)
      } catch (error) {
        console.error("Error loading book:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadBook()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sách</h1>
          <p className="text-muted-foreground">Slug "{slug}" không tồn tại trong hệ thống.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BookOverview book={book} />
    </div>
  )
}
