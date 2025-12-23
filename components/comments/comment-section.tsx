import { useState } from "react";
import { useStore } from "@tanstack/react-store";
import { MessageSquare } from "lucide-react";

import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";
import type { Comment, CommentWithReplies } from "@/types/comment";
import { useComments } from "@/hooks/queries/comments";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface CommentSectionProps {
  bookSlug: string;
  chapterSlug: string;
}

export function CommentSection({ bookSlug, chapterSlug }: CommentSectionProps) {
  const { user } = useAuthStore();
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useComments(bookSlug, chapterSlug);

  // Flatten all pages into one array
  const comments: Comment[] =
    data?.pages.flatMap((page) => page.comments) || [];

  // Group comments into Root -> Children
  const rootComments = comments.filter((c) => !c.parent_id);
  const getReplies = (parentId: string) =>
    comments.filter((c) => c.parent_id === parentId);

  if (!isCommentsVisible) {
    return (
      <div className="mt-12 max-w-3xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold text-muted-foreground">
          <MessageSquare className="w-5 h-5" />
          <h3>Bình luận</h3>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsCommentsVisible(true)}
          className="w-full sm:w-auto"
        >
          Hiển thị bình luận
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-12 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <MessageSquare className="w-6 h-6" />
        <h3>Bình luận</h3>
        {comments.length > 0 && (
          <span className="text-muted-foreground text-lg font-normal">
            ({comments.length})
          </span>
        )}
      </div>

      {user ? (
        <CommentForm bookSlug={bookSlug} chapterSlug={chapterSlug} />
      ) : (
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
          <span className="text-sm text-muted-foreground">
            Đăng nhập để tham gia bình luận
          </span>
          <Button asChild variant="secondary" size="sm">
            <Link
              href={`/login?redirect=${encodeURIComponent(
                window.location.pathname
              )}`}
            >
              Đăng nhập
            </Link>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          rootComments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <CommentItem comment={comment} currentUserId={user?.id} />

              {/* Render Replies */}
              <div className="pl-8 md:pl-12 space-y-4 border-l-2 ml-2">
                {getReplies(comment.id).map((reply: Comment) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    currentUserId={user?.id}
                    isReply
                  />
                ))}
              </div>
            </div>
          ))
        )}

        {!isLoading && comments.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ suy nghĩ của
            bạn!
          </div>
        )}

        {hasNextPage && (
          <div className="text-center pt-4">
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Đang tải..." : "Xem thêm bình luận"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
