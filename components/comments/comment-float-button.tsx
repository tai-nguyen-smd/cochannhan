"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CommentFloatButtonProps {
  commentCount: number;
  onClick: () => void;
  className?: string;
}

export function CommentFloatButton({
  commentCount,
  onClick,
  className,
}: CommentFloatButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "fixed bottom-6 p-5 right-6 h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all z-50",
        "bg-primary hover:bg-primary/90",
        className
      )}
    >
      <div className="relative">
        <MessageSquare className="h-6 w-6" />
        {commentCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full min-w-[20px]"
          >
            {commentCount > 99 ? "99+" : commentCount}
          </Badge>
        )}
      </div>
    </Button>
  );
}
