"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ChapterMenu } from "@/components/reader/chapter-menu"
import { ReaderContent } from "@/components/reader/reader-content"
import { ReaderSettings } from "@/components/reader/reader-settings"
import { getBookBySlug } from "@/lib/books"

export default function ChapterPage() {
  const params = useParams()
  const bookSlug = params.slug as string
  const chapterSlug = params.chapterSlug as string
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [readerSettings, setReaderSettings] = useState({
    fontSize: 16,
    fontFamily: "Inter",
    theme: "light",
    lineHeight: 1.6,
  })

  useEffect(() => {
    // Load reader settings from localStorage
    const savedSettings = localStorage.getItem("reader-settings")
    if (savedSettings) {
      setReaderSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    // Save reader settings to localStorage
    localStorage.setItem("reader-settings", JSON.stringify(readerSettings))
  }, [readerSettings])

  useEffect(() => {
    const loadBook = async () => {
      try {
        setLoading(true)
        const bookData = await getBookBySlug(bookSlug)
        setBook(bookData)

        // Save current chapter to localStorage
        if (bookData) {
          const currentChapter = bookData.chapters.find((ch) => ch.slug === chapterSlug)
          if (currentChapter) {
            localStorage.setItem(`book-${bookSlug}-progress`, currentChapter.id.toString())
          }
        }
      } catch (error) {
        console.error("Error loading book:", error)
      } finally {
        setLoading(false)
      }
    }

    if (bookSlug) {
      loadBook()
    }
  }, [bookSlug, chapterSlug])

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
          <p className="text-muted-foreground">Slug "{bookSlug}" không tồn tại trong hệ thống.</p>
        </div>
      </div>
    )
  }

  const currentChapter = book.chapters.find((ch) => ch.slug === chapterSlug)
  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy chương</h1>
          <p className="text-muted-foreground">Chương "{chapterSlug}" không tồn tại.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" data-theme={readerSettings.theme}>
      <Header />
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ChapterMenu book={book} currentChapter={currentChapter} />
          <ReaderSettings settings={readerSettings} onSettingsChange={setReaderSettings} />
        </div>
        <ReaderContent book={book} currentChapter={currentChapter} settings={readerSettings} />
      </div>
    </div>
  )
}
