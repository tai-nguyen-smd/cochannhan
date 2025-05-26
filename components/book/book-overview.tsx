"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Play, RotateCcw, Clock, User, FileText, Bookmark, Download, Wifi, WifiOff } from "lucide-react"
import { getBookProgress, calculateProgress } from "@/lib/books"
import { useOfflineStatus } from "@/hooks/use-offline"

interface Chapter {
  id: number
  slug: string
  title: string
  content: string
}

interface Book {
  id: string
  slug: string
  title: string
  author: string
  cover: string
  description: string
  chapters: Chapter[]
}

interface BookOverviewProps {
  book: Book
}

export function BookOverview({ book }: BookOverviewProps) {
  const router = useRouter()
  const isOffline = useOfflineStatus()
  const [currentChapter, setCurrentChapter] = useState(1)
  const [progress, setProgress] = useState(0)
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [isDownloaded, setIsDownloaded] = useState(false)

  useEffect(() => {
    // Load progress and bookmarks
    const savedProgress = getBookProgress(book.slug)
    const savedBookmarks = localStorage.getItem(`book-${book.slug}-bookmarks`)

    setCurrentChapter(savedProgress || 1)
    setProgress(calculateProgress(book.slug))

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }

    // Check if book is downloaded for offline reading
    checkOfflineAvailability()
  }, [book.slug])

  const checkOfflineAvailability = async () => {
    if ("caches" in window) {
      const cache = await caches.open("ebook-content")
      const cachedBook = await cache.match(`/api/books/${book.slug}`)
      setIsDownloaded(!!cachedBook)
    }
  }

  const downloadForOffline = async () => {
    if ("caches" in window) {
      try {
        const cache = await caches.open("ebook-content")

        // Cache book data and all chapters
        await cache.put(`/api/books/${book.slug}`, new Response(JSON.stringify(book)))

        // Cache each chapter content
        for (const chapter of book.chapters) {
          await cache.put(`/api/books/${book.slug}/${chapter.slug}`, new Response(JSON.stringify(chapter)))
        }

        setIsDownloaded(true)

        // Show success notification
        if ("serviceWorker" in navigator && "Notification" in window) {
          new Notification("Đã tải sách để đọc offline!", {
            body: `"${book.title}" đã sẵn sàng để đọc offline`,
            icon: "/icon-192x192.png",
          })
        }
      } catch (error) {
        console.error("Error downloading book for offline:", error)
      }
    }
  }

  const handleContinueReading = () => {
    const chapter = book.chapters.find((ch) => ch.id === currentChapter) || book.chapters[0]
    router.push(`/book/${book.slug}/${chapter.slug}`)
  }

  const handleStartFromBeginning = () => {
    const firstChapter = book.chapters[0]
    router.push(`/book/${book.slug}/${firstChapter.slug}`)
  }

  const handleChapterSelect = (chapter: Chapter) => {
    router.push(`/book/${book.slug}/${chapter.slug}`)
  }

  const estimatedReadingTime = Math.ceil(
    book.chapters.reduce((total, chapter) => {
      const wordCount = chapter.content.split(" ").length
      return total + wordCount / 200 // Average reading speed: 200 words per minute
    }, 0),
  )

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Offline Status */}
        {isOffline && (
          <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm">
                Bạn đang offline. {isDownloaded ? "Sách này có thể đọc offline." : "Tải sách để đọc offline."}
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Book Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="aspect-[3/4] w-full max-w-64 mx-auto mb-4">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
                <CardTitle className="text-xl sm:text-2xl">{book.title}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <User className="h-4 w-4" />
                  {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{book.description}</p>

                {/* Book Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{book.chapters.length}</div>
                    <div className="text-xs text-muted-foreground">Chương</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">{estimatedReadingTime}</div>
                    <div className="text-xs text-muted-foreground">Phút đọc</div>
                  </div>
                </div>

                {/* Progress */}
                {progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Tiến độ đọc</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Chương {currentChapter} / {book.chapters.length}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  {progress > 0 ? (
                    <Button onClick={handleContinueReading} className="w-full" size="lg">
                      <Play className="h-4 w-4 mr-2" />
                      Đọc tiếp (Chương {currentChapter})
                    </Button>
                  ) : (
                    <Button onClick={handleStartFromBeginning} className="w-full" size="lg">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Bắt đầu đọc
                    </Button>
                  )}

                  {progress > 0 && (
                    <Button onClick={handleStartFromBeginning} variant="outline" className="w-full">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Đọc từ đầu
                    </Button>
                  )}

                  {/* Offline Download */}
                  <Button onClick={downloadForOffline} variant="outline" className="w-full" disabled={isDownloaded}>
                    {isDownloaded ? (
                      <>
                        <Wifi className="h-4 w-4 mr-2" />
                        Đã tải offline
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Tải để đọc offline
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chapter List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Danh sách chương
                </CardTitle>
                <CardDescription>Chọn chương để bắt đầu đọc</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {book.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => handleChapterSelect(chapter)}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {chapter.id}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium line-clamp-1">{chapter.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {Math.ceil(chapter.content.split(" ").length / 200)} phút
                            </span>
                            <span>{chapter.content.split(" ").length} từ</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {bookmarks.includes(chapter.id) && <Bookmark className="h-4 w-4 text-yellow-500" />}

                          {currentChapter === chapter.id && <Badge variant="secondary">Đang đọc</Badge>}

                          {currentChapter > chapter.id && <Badge variant="default">Đã đọc</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
