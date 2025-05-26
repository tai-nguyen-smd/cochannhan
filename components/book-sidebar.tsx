"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface BookSidebarProps {
  book: Book
  currentChapter: number
  onChapterSelect: (chapterId: number) => void
}

export function BookSidebar({ book, currentChapter, onChapterSelect }: BookSidebarProps) {
  const [bookmarks, setBookmarks] = useState<number[]>([])

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem(`book-bookmarks`)
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  const toggleBookmark = (chapterId: number) => {
    const newBookmarks = bookmarks.includes(chapterId)
      ? bookmarks.filter((id) => id !== chapterId)
      : [...bookmarks, chapterId]

    setBookmarks(newBookmarks)
    localStorage.setItem(`book-bookmarks`, JSON.stringify(newBookmarks))
  }

  const readProgress = Math.round((currentChapter / book.chapters.length) * 100)

  return (
    <Sidebar className="w-80">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg line-clamp-1">{book.title}</h2>
          <SidebarTrigger />
        </div>
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
        <div className="space-y-2">
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
      </SidebarHeader>

      <SidebarContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Danh sách chương
          </h3>
        </div>

        <SidebarMenu>
          {book.chapters.map((chapter) => (
            <SidebarMenuItem key={chapter.id}>
              <div className="flex items-center gap-2 w-full">
                <SidebarMenuButton
                  onClick={() => onChapterSelect(chapter.id)}
                  className={cn(
                    "flex-1 justify-start",
                    currentChapter === chapter.id && "bg-accent text-accent-foreground",
                  )}
                >
                  <span className="line-clamp-1">{chapter.title}</span>
                  {currentChapter === chapter.id && (
                    <Badge variant="secondary" className="ml-auto">
                      Đang đọc
                    </Badge>
                  )}
                </SidebarMenuButton>

                <Button variant="ghost" size="sm" onClick={() => toggleBookmark(chapter.id)} className="p-1 h-8 w-8">
                  {bookmarks.includes(chapter.id) ? (
                    <BookmarkCheck className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {bookmarks.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <BookmarkCheck className="h-4 w-4 text-yellow-500" />
              Đã đánh dấu ({bookmarks.length})
            </h3>
            <SidebarMenu>
              {book.chapters
                .filter((chapter) => bookmarks.includes(chapter.id))
                .map((chapter) => (
                  <SidebarMenuItem key={`bookmark-${chapter.id}`}>
                    <SidebarMenuButton onClick={() => onChapterSelect(chapter.id)} className="justify-start">
                      <BookmarkCheck className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="line-clamp-1">{chapter.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
