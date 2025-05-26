"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, Search, BookOpen, Bookmark, BookmarkCheck, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Chapter {
  id: number
  title: string
  content: string
}

interface Book {
  id: string
  slug: string
  title: string
  author: string
  chapters: Chapter[]
}

interface ChapterMenuProps {
  book: Book
  currentChapter: number
  onChapterSelect: (chapterId: number) => void
}

export function ChapterMenu({ book, currentChapter, onChapterSelect }: ChapterMenuProps) {
  const params = useParams()
  const slug = params.slug as string
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarks, setBookmarks] = useState<number[]>([])

  useEffect(() => {
    // Load bookmarks from localStorage using slug
    const savedBookmarks = localStorage.getItem(`book-${slug}-bookmarks`)
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [slug])

  const toggleBookmark = (chapterId: number) => {
    const newBookmarks = bookmarks.includes(chapterId)
      ? bookmarks.filter((id) => id !== chapterId)
      : [...bookmarks, chapterId]

    setBookmarks(newBookmarks)
    localStorage.setItem(`book-${slug}-bookmarks`, JSON.stringify(newBookmarks))
  }

  const filteredChapters = book.chapters.filter((chapter) =>
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const readProgress = Math.round((currentChapter / book.chapters.length) * 100)

  const handleChapterSelect = (chapterId: number) => {
    onChapterSelect(chapterId)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Menu className="h-4 w-4" />
          <span className="hidden sm:inline">Danh sách chương</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96 p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-left line-clamp-1">{book.title}</SheetTitle>
          </div>
          <p className="text-sm text-muted-foreground text-left">{book.author}</p>

          {/* Progress */}
          <div className="space-y-2 mt-3">
            <div className="flex items-center justify-between text-sm">
              <span>Tiến độ đọc</span>
              <span className="font-medium">{readProgress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${readProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Chương {currentChapter}</span>
              <span>{book.chapters.length} chương</span>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm chương..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Chapter List */}
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium text-sm">
                  {searchQuery ? `Kết quả tìm kiếm (${filteredChapters.length})` : "Danh sách chương"}
                </span>
              </div>

              {filteredChapters.map((chapter) => (
                <div key={chapter.id} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleChapterSelect(chapter.id)}
                    className={cn(
                      "flex-1 justify-start h-auto p-3 text-left",
                      currentChapter === chapter.id && "bg-accent text-accent-foreground",
                    )}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="line-clamp-2 text-sm font-medium">{chapter.title}</span>
                      {currentChapter === chapter.id && (
                        <Badge variant="secondary" className="text-xs">
                          Đang đọc
                        </Badge>
                      )}
                    </div>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(chapter.id)}
                    className="p-2 h-8 w-8 shrink-0"
                  >
                    {bookmarks.includes(chapter.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}

              {filteredChapters.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Không tìm thấy chương nào</p>
                </div>
              )}
            </div>

            {/* Bookmarks Section */}
            {bookmarks.length > 0 && !searchQuery && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-sm">Đã đánh dấu ({bookmarks.length})</span>
                </div>
                <div className="space-y-1">
                  {book.chapters
                    .filter((chapter) => bookmarks.includes(chapter.id))
                    .map((chapter) => (
                      <Button
                        key={`bookmark-${chapter.id}`}
                        variant="ghost"
                        onClick={() => handleChapterSelect(chapter.id)}
                        className="w-full justify-start h-auto p-3 text-left"
                      >
                        <BookmarkCheck className="h-4 w-4 text-yellow-500 mr-2 shrink-0" />
                        <span className="line-clamp-2 text-sm">{chapter.title}</span>
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
