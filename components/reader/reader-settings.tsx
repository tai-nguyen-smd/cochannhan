"use client";

import { useState } from "react";
import { Minus, Palette, Plus, RotateCcw, Settings, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { useReaderSettingsStore } from "@/stores/reader-settings.store";
import { fontMap } from "@/app/fontMap";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const FONT_SIZE_MIN = 12;
const FONT_SIZE_MAX = 28;
const LINE_HEIGHT_MIN = 1.2;
const LINE_HEIGHT_MAX = 2.5;
const LINE_HEIGHT_STEP = 0.1;

interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: string;
  lineHeight: number;
}

const fontList = Object.values(fontMap);

export function ReaderSettings() {
  const { settings, updateSettings } = useReaderSettingsStore();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  const updateSetting = (key: keyof ReaderSettings, value: string | number) => {
    updateSettings({ ...settings, [key]: value });
    if (key === "theme") {
      setTheme(value as string);
    }
  };

  const resetSettings = () => {
    updateSettings({
      fontSize: 16,
      fontFamily: fontMap.Inter.className,
      theme: "light",
      lineHeight: 1.6,
    });
    setTheme("light");
  };

  const fontSizeDown = () => {
    if (settings.fontSize > FONT_SIZE_MIN) {
      updateSetting("fontSize", settings.fontSize - 1);
    }
  };

  const fontSizeUp = () => {
    if (settings.fontSize < FONT_SIZE_MAX) {
      updateSetting("fontSize", settings.fontSize + 1);
    }
  };

  const lineHeightDown = () => {
    const next = Math.round((settings.lineHeight - LINE_HEIGHT_STEP) * 10) / 10;
    if (next >= LINE_HEIGHT_MIN) {
      updateSetting("lineHeight", next);
    }
  };

  const lineHeightUp = () => {
    const next = Math.round((settings.lineHeight + LINE_HEIGHT_STEP) * 10) / 10;
    if (next <= LINE_HEIGHT_MAX) {
      updateSetting("lineHeight", next);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Tùy chỉnh</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80dvh]">
        <div className="mx-auto w-full max-w-md p-4 overflow-y-auto">
          <DrawerHeader className="text-left px-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-lg">Cài đặt đọc</DrawerTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={resetSettings}
                aria-label="Đặt lại"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>

          <div className="mt-6 space-y-6">
            {/* Cỡ chữ */}
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <Type className="h-4 w-4 shrink-0" />
                Cỡ chữ
              </h4>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-lg"
                  onClick={fontSizeDown}
                  disabled={settings.fontSize <= FONT_SIZE_MIN}
                  aria-label="Giảm cỡ chữ"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span
                  className="min-w-16 text-center text-lg font-medium tabular-nums"
                  aria-live="polite"
                >
                  {settings.fontSize}px
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-lg"
                  onClick={fontSizeUp}
                  disabled={settings.fontSize >= FONT_SIZE_MAX}
                  aria-label="Tăng cỡ chữ"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </section>

            {/* Font chữ */}
            <section className="space-y-3">
              <h4 className="text-sm font-semibold">Font chữ</h4>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {fontList.map((font) => {
                  const isSelected = settings.fontFamily === font.className;
                  return (
                    <button
                      key={font.className}
                      type="button"
                      onClick={() => updateSetting("fontFamily", font.className)}
                      className={cn(
                        "rounded-lg border-2 px-3 py-3 text-left text-sm font-medium transition-colors",
                        "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/40"
                      )}
                    >
                      <span className={font.className}>{font.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Khoảng cách dòng */}
            <section className="space-y-3">
              <h4 className="text-sm font-semibold">Khoảng cách dòng</h4>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-lg"
                  onClick={lineHeightDown}
                  disabled={settings.lineHeight <= LINE_HEIGHT_MIN}
                  aria-label="Giảm khoảng cách dòng"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span
                  className="min-w-16 text-center text-lg font-medium tabular-nums"
                  aria-live="polite"
                >
                  {settings.lineHeight.toFixed(1)}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-lg"
                  onClick={lineHeightUp}
                  disabled={settings.lineHeight >= LINE_HEIGHT_MAX}
                  aria-label="Tăng khoảng cách dòng"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </section>

            {/* Chủ đề màu */}
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-semibold">
                <Palette className="h-4 w-4 shrink-0" />
                Chủ đề màu
              </h4>
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                <span className="text-sm font-medium">
                  {settings.theme === "dark" ? "Tối" : "Sáng"}
                </span>
                <Switch
                  checked={settings.theme === "dark"}
                  onCheckedChange={(checked) =>
                    updateSetting("theme", checked ? "dark" : "light")
                  }
                  aria-label="Bật chế độ tối"
                />
              </div>
            </section>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
