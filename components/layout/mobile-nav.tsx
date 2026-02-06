"use client";

import { useState } from "react";
import { Book, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { NAV_ITEMS } from "@/constants/navigation";
import { useUnreadFeedbackCount } from "@/hooks/queries/feedback";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: unreadCount = 0 } = useUnreadFeedbackCount(user?.id);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="md:hidden rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            Cổ Chân Nhân
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 pb-6">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isFeedback = item.href === "/feedback";
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start gap-2 relative"
                  onClick={() => handleNavigate(item.href)}
                >
                  <item.icon className={`h-4 w-4 ${item.className || ""}`} />
                  {item.label}
                  {isFeedback && unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs font-bold rounded-full min-w-[20px]"
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
          <Separator />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
