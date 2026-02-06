"use client";

import { LogOut, MessageSquare, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/hooks/queries/auth";

export function UserAvatar({ className }: { className?: string }) {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayName =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    "Chưa cập nhật";

  // ✅ đóng khi đổi route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ✅ click outside → đóng
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const getInitials = () => {
    if (!displayName) return "U";
    const p = displayName.trim().split(" ");
    return p.length > 1
      ? `${p[0][0]}${p[p.length - 1][0]}`.toUpperCase()
      : displayName.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen((v) => !v)}
      >
        <Avatar className={cn("h-10 w-10", className)}>
          <AvatarImage src={user?.user_metadata?.avatar_url} alt={displayName} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border bg-popover p-1 shadow-md">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <div className="my-1 h-px bg-muted" />

          <Link
            href="/profile"
            className="flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>

          <Link
            href="/feedback"
            className="flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Góp ý & Báo lỗi
          </Link>

          <div className="my-1 h-px bg-muted" />

          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
