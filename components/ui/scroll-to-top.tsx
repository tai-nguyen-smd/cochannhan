"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ScrollToTopProps {
  showAfter?: number;
  className?: string;
}

export function ScrollToTop({ showAfter = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Show/hide button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-20 right-6 z-50 p-3  text-white rounded-full shadow-lg transition-all duration-300 transform",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none",
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </Button>
  );
}
