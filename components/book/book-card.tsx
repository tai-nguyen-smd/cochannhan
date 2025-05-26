"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, User } from "lucide-react";
import { Book } from "@/types/type";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/${book.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <CardHeader className="p-3 sm:p-4">
          <div className="aspect-[3/4] relative mb-3 sm:mb-4">
            <img
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <CardTitle className="text-sm sm:text-lg line-clamp-2 leading-tight">
            {book.title}
          </CardTitle>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
