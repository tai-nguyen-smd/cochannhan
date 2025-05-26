"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface Chapter {
  id: number
  title: string
  content: string
}

interface Book {
  title: string
  author: string
  chapters: Chapter[]
}

interface ReaderSettings {
  fontSize: number
  fontFamily: string
  theme: string
  lineHeight: number
}

interface ReaderContentProps {
  book: Book
  currentChapter: number
  onChapterChange: (chapterId: number) => void
  settings: ReaderSettings
}

export function ReaderContent({ book, currentChapter, onChapterChange, settings }: ReaderContentProps) {
  const chapter = book.chapters.find((ch) => ch.id === currentChapter)
  const currentIndex = book.chapters.findIndex((ch) => ch.id === currentChapter)
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < book.chapters.length - 1

  const handlePrevious = () => {
    if (canGoPrevious) {
      onChapterChange(book.chapters[currentIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      onChapterChange(book.chapters[currentIndex + 1].id)
    }
  }

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Không tìm thấy chương</h2>
          <p className="text-muted-foreground">Vui lòng chọn chương khác từ menu</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chapter Header */}
      <div className="border-b p-3 sm:p-4 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold line-clamp-1">{chapter.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Chương {currentChapter} / {book.chapters.length}
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={handlePrevious} disabled={!canGoPrevious}>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Trước</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleNext} disabled={!canGoNext}>
              <span className="hidden sm:inline mr-1">Tiếp</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div
          className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
          style={{
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
          }}
        >
          <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-blockquote:text-muted-foreground prose-code:text-foreground">
            <ReactMarkdown>{chapter.content}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t p-3 sm:p-4 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2 text-xs sm:text-sm max-w-[40%]"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {canGoPrevious ? book.chapters[currentIndex - 1].title : "Không có chương trước"}
            </span>
          </Button>

          <div className="text-xs sm:text-sm text-muted-foreground px-4">
            {currentIndex + 1} / {book.chapters.length}
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 text-xs sm:text-sm max-w-[40%]"
          >
            <span className="truncate">
              {canGoNext ? book.chapters[currentIndex + 1].title : "Không có chương tiếp"}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  )
}
