import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useAddComment } from "@/hooks/queries/comments";
import { useAuthStore } from "@/stores/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentFormProps {
  bookSlug: string;
  chapterSlug: string;
  parentId?: string | null;
  onSuccess?: () => void;
  placeholder?: string;
  onCancel?: () => void;
}

const formSchema = z.object({
  content: z
    .string()
    .min(1, "Bình luận không được để trống")
    .max(500, "Bình luận tối đa 500 ký tự"),
});

export function CommentForm({
  bookSlug,
  chapterSlug,
  parentId = null,
  onSuccess,
  placeholder = "Viết bình luận...",
  onCancel,
}: CommentFormProps) {
  const { user } = useAuthStore();
  const { mutate: addComment, isPending } = useAddComment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const displayName =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    "Anonymous";

  const content = form.watch("content");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.content.trim()) return;

    addComment(
      {
        user_id: user?.id ?? "",
        username: displayName,
        avatar_url: user?.user_metadata?.avatar_url,
        content: values.content.trim(),
        book_slug: bookSlug,
        chapter_slug: chapterSlug,
        parent_id: parentId,
      },
      {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      }
    );
  };

  const getInitials = (name?: string) => {
    return name ? name.substring(0, 2).toUpperCase() : "U";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex items-start gap-2">
          {user && (
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-xs">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1 flex items-end gap-2">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring h-9 text-sm"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-full flex-shrink-0"
              disabled={!content.trim() || isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
                disabled={isPending}
                className="h-9"
              >
                Hủy
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
