"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSwipe } from "@/hooks/use-swipe";
import { Book, Chapter, ChapterListItem, ReaderSettings } from "@/types/type";

interface ReaderContentProps {
  book: Book;
  chapterList: ChapterListItem[];
  settings: ReaderSettings;
  currentChapter: Chapter;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
}

export function ReaderContent({
  book,
  currentChapter,
  chapterList,
  settings,
  nextChapter,
  prevChapter,
}: ReaderContentProps) {
  const params = useParams();
  const router = useRouter();
  const bookSlug = params.bookSlug as string;

  const canGoPrevious = prevChapter !== null;
  const canGoNext = nextChapter !== null;

  const handlePrevious = () => {
    if (canGoPrevious) {
      router.push(`/${bookSlug}/${prevChapter.slug}`);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      router.push(`/${bookSlug}/${nextChapter.slug}`);
    }
  };

  // Swipe handlers
  const swipeRef = useSwipe(
    {
      onSwipeLeft: handleNext,
      onSwipeRight: handlePrevious,
    },
    {
      threshold: 100,
      preventDefaultTouchmoveEvent: false,
    }
  );

  // Apply theme styles
  const getThemeStyles = () => {
    switch (settings.theme) {
      case "dark":
        return {
          backgroundColor: "#1a1a1a",
          color: "#e5e5e5",
        };
      case "sepia":
        return {
          backgroundColor: "#f4f1ea",
          color: "#5c4b37",
        };
      default:
        return {
          backgroundColor: "#ffffff",
          color: "#000000",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div
      className="flex-1 flex flex-col"
      style={themeStyles}
      ref={swipeRef as any}
    >
      {/* Chapter Header */}
      <div className="border-b p-3 sm:p-4 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold line-clamp-1">
              {currentChapter.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Chương {currentChapter.id} / {chapterList.length}
            </p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Trước</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!canGoNext}
            >
              <span className="hidden sm:inline mr-1">Tiếp</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="sm:hidden p-2 text-center">
        <p className="text-xs text-muted-foreground">
          💡 Vuốt trái/phải để chuyển chương
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={themeStyles}>
        <div
          className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
          style={{
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            lineHeight: settings.lineHeight,
            color: themeStyles.color,
          }}
        >
          <div className="prose prose-sm sm:prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1
                    style={{
                      color: themeStyles.color,
                      fontSize: `${settings.fontSize + 8}px`,
                    }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    style={{
                      color: themeStyles.color,
                      fontSize: `${settings.fontSize + 4}px`,
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      color: themeStyles.color,
                      fontSize: `${settings.fontSize + 2}px`,
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p
                    style={{
                      color: themeStyles.color,
                      lineHeight: settings.lineHeight,
                    }}
                  >
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong style={{ color: themeStyles.color }}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em style={{ color: themeStyles.color }}>{children}</em>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      color: settings.theme === "dark" ? "#a1a1aa" : "#6b7280",
                      borderLeftColor:
                        settings.theme === "dark" ? "#374151" : "#d1d5db",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                li: ({ children }) => (
                  <li style={{ color: themeStyles.color }}>{children}</li>
                ),
              }}
            >
              {currentChapter.content}
            </ReactMarkdown>
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
              {canGoPrevious ? prevChapter?.title : "Không có chương trước"}
            </span>
          </Button>

          <div className="text-xs sm:text-sm text-muted-foreground px-4">
            {currentChapter.id} / {chapterList.length}
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 text-xs sm:text-sm max-w-[40%]"
          >
            <span className="truncate">
              {canGoNext ? nextChapter?.title : "Không có chương tiếp"}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
}
