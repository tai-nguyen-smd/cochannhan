"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChapterMenuDrawer from "@/components/reader/chapter-menu-drawer";
import { ReaderContent } from "@/components/reader/reader-content";
import { ReaderSettings } from "@/components/reader/reader-settings";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-sprinner";
import {
  useFetchBookBySlug,
  useFetchChapterData,
  useFetchChapterList,
} from "@/hooks/queries/books";
import { recentAccessActions } from "@/stores/recent-access.store";
import { useReaderSettingsStore } from "@/stores/reader-settings.store";
import { RandomTips } from "@/components/tips/random-tips";
import { CommentFloatButton } from "@/components/comments/comment-float-button";
import { CommentBottomSheet } from "@/components/comments/comment-bottom-sheet";
import { useCommentCount } from "@/hooks/queries/comments";
import { useUpdateProfile } from "@/hooks/queries/profiles";
import { useAuthStore } from "@/stores/auth.store";
import { useBookmarkStore } from "@/stores/bookmark.store";
import { useRecentAccessStore } from "@/stores/recent-access.store";
import { useMounted } from "@/hooks/use-mounted";
import Loading from "@/app/loading";

export function ReadingPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookSlug = searchParams.get("bookSlug") ?? "";
  const chapterSlug = searchParams.get("chapterSlug") ?? "";
  const mounted = useMounted();

  const [showControl, setShowControl] = useState(false);
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);

  const hasParams = Boolean(bookSlug && chapterSlug);

  const { data: book } = useFetchBookBySlug(bookSlug);
  const { data: chapterList, isLoading: isLoadingChapterList } =
    useFetchChapterList(bookSlug);
  const { data: chapterData, isLoading } = useFetchChapterData(
    bookSlug,
    chapterSlug
  );

  const { data: commentCount = 0 } = useCommentCount(bookSlug, chapterSlug);

  const { settings } = useReaderSettingsStore();
  const { user } = useAuthStore();
  const { mutate: updateProfile } = useUpdateProfile({ showMessage: false });
  const { bookmarks } = useBookmarkStore();
  const { items: recentAccess } = useRecentAccessStore();
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user?.id) {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
      syncTimeoutRef.current = setTimeout(() => {
        updateProfile({
          user_id: user.id,
          bookmarks: bookmarks,
          reader_settings: settings,
          recent_access: recentAccess,
        });
      }, 3000);
    }
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [user?.id, bookmarks, settings, recentAccess, updateProfile]);

  useEffect(() => {
    if (chapterData?.currentChapter) {
      recentAccessActions.addRecentAccess({
        title: chapterData.currentChapter.title,
        bookSlug,
        chapterSlug,
      });
    }
  }, [chapterData?.currentChapter, bookSlug, chapterSlug]);

  if (!mounted) {
    return <Loading />;
  }

  if (!hasParams) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <p>Thiếu tham số book hoặc chương.</p>
          <Button
            variant="link"
            className="mt-2"
            onClick={() => router.push("/")}
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  console.log(chapterData);

  if(chapterData?.currentChapter?.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <p>Lỗi khi tải chương.</p>
          <Button onClick={() => router.replace(`/${bookSlug}`)}>Về trang chính</Button>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen bg-background"
      data-theme={settings.theme}
      suppressHydrationWarning
    >
      <div
        className="flex flex-col h-20"
        style={
          showControl
            ? { position: "sticky", width: "100%", top: 0 }
            : undefined
        }
      >
        <div className="flex items-center gap-2 p-4 border-b bg-background/95 ">
          <Button onClick={() => router.replace(`/${bookSlug}`)}>
            <ArrowLeft />
          </Button>
          {book && chapterList && chapterData?.currentChapter && (
            <ChapterMenuDrawer
              chapterList={chapterList}
              book={book}
              currentChapter={chapterData.currentChapter}
              isLoading={isLoadingChapterList}
            />
          )}
          <ReaderSettings />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      <div>
        {!isLoading && chapterData?.currentChapter && book && (
          <div className="pb-6">
            <ReaderContent
              showControl={showControl}
              setShowControl={setShowControl}
              book={book}
              currentChapter={chapterData.currentChapter}
              chapterList={chapterList || []}
              nextMeta={chapterData.nextMeta}
              prevMeta={chapterData.prevMeta}
            />
          </div>
        )}
      </div>
      {!isLoading && (
        <RandomTips />
      )}

      {!isLoading && chapterData?.currentChapter && (
        <>
          <CommentFloatButton
            commentCount={commentCount}
            onClick={() => setIsCommentSheetOpen(true)}
          />
          {isCommentSheetOpen && (
            <CommentBottomSheet
              bookSlug={bookSlug}
              chapterSlug={chapterSlug}
              open={isCommentSheetOpen}
              onOpenChange={setIsCommentSheetOpen}
            />
          )}
        </>
      )}
    </div>
  );
}
