"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useProfile } from "@/hooks/queries/profiles";
import { useBookmarkStore } from "@/stores/bookmark.store";
import { useReaderSettingsStore, initialStateSettings } from "@/stores/reader-settings.store";
import { useRecentAccessStore } from "@/stores/recent-access.store";
import { ReaderSettings } from "@/types/type";
import { useTheme } from "next-themes";

export const ProfileSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useProfile();
  const { overrideBookmarks } = useBookmarkStore();
  const { overrideSettings } = useReaderSettingsStore();
  const { overrideRecentAccess } = useRecentAccessStore();
  const { setTheme } = useTheme();
  const hasSyncedRef = useRef(false);

  // ✅ Auto sync data from cloud when user logs in and profile is loaded
  useEffect(() => {
    if (user && profile && !isLoading && !hasSyncedRef.current) {
      // Only override if profile has data
      if (profile.bookmarks) {
        overrideBookmarks(profile.bookmarks);
      }
      if (profile.reader_settings) {
        overrideSettings(
          (profile.reader_settings as ReaderSettings) ?? initialStateSettings
        );
      }
      if (profile.recent_access) {
        overrideRecentAccess(profile.recent_access);
      }
      if (profile.reader_settings?.theme) {
        setTheme(profile.reader_settings.theme);
      }
      hasSyncedRef.current = true;
    }
    
    // Reset sync flag when user logs out
    if (!user) {
      hasSyncedRef.current = false;
    }
  }, [user, profile, isLoading, overrideBookmarks, overrideSettings, overrideRecentAccess, setTheme]);

  return <>{children}</>;
};
