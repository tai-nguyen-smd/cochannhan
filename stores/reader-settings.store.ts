// stores/readerSettingsStore.ts
import { Store, useStore } from "@tanstack/react-store";
import { useMemo } from "react";
import type { ReaderSettings } from "@/types/type";
import { debounceSave, loadFromLocalStorage } from "@/lib/localstorage";

const STORAGE_KEY = "reader-settings-store";

export const initialStateSettings: ReaderSettings = {
  fontSize: 16,
  fontFamily: "Inter",
  theme: "light",
  lineHeight: 1.6,
};

export const readerSettingsStore = new Store<ReaderSettings>(
  loadFromLocalStorage(STORAGE_KEY, initialStateSettings)
);

// ✅ Auto-save to localStorage on state change
readerSettingsStore.subscribe(() => {
  debounceSave(STORAGE_KEY, readerSettingsStore.state);
});

// ✅ Actions
export const readerSettingsActions = {
  // Update one or more settings
  updateSettings: (partial: Partial<ReaderSettings>) => {
    readerSettingsStore.setState((state) => ({
      ...state,
      ...partial,
    }));
  },

  // Reset to default
  resetSettings: () => {
    readerSettingsStore.setState(initialStateSettings);
  },

  // Get current settings
  getSettings: (): ReaderSettings => {
    return readerSettingsStore.state;
  },
  overrideSettings: (settings: ReaderSettings) => {
    readerSettingsStore.setState((state) => {
      return {
        ...settings,
      };
    });
  },
};

// ✅ Custom hook
export const useReaderSettingsStore = () => {
  const settings = useStore(readerSettingsStore);

  return {
    settings,
    ...readerSettingsActions,
  };
};
