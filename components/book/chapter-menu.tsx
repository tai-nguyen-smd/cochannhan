"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Bookmark, BookmarkCheck, Search } from "lucide-react";
import { List } from "react-window";
import type { ListImperativeAPI, RowComponentProps } from "react-window";
import { Checkbox } from "../ui/checkbox";
import { LoadingSpinner } from "../ui/loading-sprinner";

import type { Book, ChapterListItem } from "@/types/type";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBookmarkStore } from "@/stores/bookmark.store";
import { useRouter } from "next/navigation";
import { getReadingUrl } from "@/lib/reading-url";

interface ChapterRowProps {
  chapters: ChapterListItem[];
  bookSlug: string;
  bookmarksForBook: string[];
  currentChapterId?: string;
  onToggleBookmark: (slug: string) => void;
  onSelectChapter: (chapter: ChapterListItem) => void;
}

interface ChapterMenuProps {
  book: Book;
  chapterList: Array<ChapterListItem>;
  currentChapter?: ChapterListItem | null;
  isLoading?: boolean;
}

function ChapterMenu({
  book,
  chapterList,
  currentChapter,
  isLoading,
}: ChapterMenuProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState<CheckedState>(false);
  const { bookmarks = {}, toggleBookmark } = useBookmarkStore();
  const bookmarksForBook =
    book?.slug && bookmarks[book.slug] ? bookmarks[book.slug] : [];

  const handleChapterSelect = useCallback(
    (chapter: ChapterListItem) => {
      if (book?.slug) router.push(getReadingUrl(book.slug, chapter.slug));
    },
    [router, book?.slug]
  );

  const filteredChapters = useMemo(() => {
    return chapterList
      .filter((chapter) =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((chapter) =>
        showBookmarks ? bookmarksForBook?.includes(chapter.slug) : true
      );
  }, [chapterList, searchQuery, showBookmarks, bookmarksForBook]);

  const currentIndex = useMemo(
    () => filteredChapters.findIndex((c) => c.id === currentChapter?.id),
    [filteredChapters, currentChapter?.id]
  );

  const itemHeight = 44;
  const listHeight = 500;
  const listRef = useRef<ListImperativeAPI | null>(null);

  const rowProps: ChapterRowProps = useMemo(
    () => ({
      chapters: filteredChapters,
      bookSlug: book?.slug || "",
      bookmarksForBook: bookmarksForBook ?? [],
      currentChapterId: currentChapter?.id,
      onToggleBookmark: (slug) => toggleBookmark(book?.slug || "", slug),
      onSelectChapter: handleChapterSelect,
    }),
    [
      filteredChapters,
      book?.slug,
      bookmarksForBook,
      currentChapter?.id,
      toggleBookmark,
      handleChapterSelect,
    ]
  );

  useEffect(() => {
    if (currentIndex < 0) return;
    const id = requestAnimationFrame(() => {
      listRef.current?.scrollToRow({ index: currentIndex, align: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [currentIndex]);

  const RowComponent = useCallback(
    (props: RowComponentProps<ChapterRowProps>) => {
      const { index, style, ariaAttributes, chapters, bookmarksForBook, currentChapterId, onToggleBookmark, onSelectChapter } = props;
      const chapter = chapters[index];
      if (!chapter) return null;
      return (
        <div style={style} className="flex items-center" {...ariaAttributes}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleBookmark(chapter.slug)}
            className="p-2 h-8 w-8 shrink-0"
          >
            {bookmarksForBook?.includes(chapter.slug) ? (
              <BookmarkCheck className="h-4 w-4 text-yellow-500" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onSelectChapter(chapter)}
            className={cn(
              "flex-1 justify-start h-auto p-3 text-left",
              currentChapterId === chapter.id && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex flex-col items-start gap-1 min-w-0 overflow-hidden">
              <span className="line-clamp-1 text-sm font-medium text-wrap">
                {chapter.title}
              </span>
            </div>
          </Button>
        </div>
      );
    },
    []
  );

  return (
    <div className="p-2 space-y-4">
      <Input
        autoFocus={false}
        placeholder="Tìm chương..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-1">
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium text-sm">
              {searchQuery
                ? `Kết quả tìm kiếm (${filteredChapters.length})`
                : "Danh sách chương"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              name="showBookmarks"
              onCheckedChange={(e: CheckedState) => {
                setShowBookmarks(e);
              }}
            ></Checkbox>
            <label htmlFor="showBookmarks">Đã đánh dấu</label>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredChapters.length > 0 ? (
          <List<ChapterRowProps>
            listRef={listRef}
            rowComponent={RowComponent}
            rowCount={filteredChapters.length}
            rowHeight={itemHeight}
            rowProps={rowProps}
            style={{ height: listHeight, width: "100%" }}
            className="border rounded-md overflow-x-hidden"
          />
        ) : searchQuery ? (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Không tìm thấy chương nào</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(ChapterMenu);
