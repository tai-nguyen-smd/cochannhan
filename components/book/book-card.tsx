"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User } from "lucide-react"

interface Book {
  id: string
  slug: string
  title: string
  author: string
  cover: string
  description: string
  chapters: number
  progress: number
}

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/book/${book.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="p-3 sm:p-4">
          <div className="aspect-[3/4] relative mb-3 sm:mb-4">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            />
            {book.progress > 0 && (
              <Badge className="absolute top-2 right-2 text-xs">
                {book.progress === 100 ? "Hoàn thành" : `${book.progress}%`}
              </Badge>
            )}
          </div>
          <CardTitle className="text-sm sm:text-lg line-clamp-2 leading-tight">{book.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs sm:text-sm">
            <User className="h-3 w-3" />
            <span className="line-clamp-1">{book.author}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 hidden sm:block">
            {book.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {book.chapters} chương
              </span>
              {book.progress > 0 && <span className="text-muted-foreground">{book.progress}%</span>}
            </div>
            {book.progress > 0 && <Progress value={book.progress} className="h-1.5 sm:h-2" />}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
