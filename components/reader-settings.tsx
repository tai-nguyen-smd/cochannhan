"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Settings, Type, Palette } from "lucide-react"

interface ReaderSettings {
  fontSize: number
  fontFamily: string
  theme: string
  lineHeight: number
}

interface ReaderSettingsProps {
  settings: ReaderSettings
  onSettingsChange: (settings: ReaderSettings) => void
}

export function ReaderSettings({ settings, onSettingsChange }: ReaderSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateSetting = (key: keyof ReaderSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Tùy chỉnh</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Type className="h-4 w-4" />
              Cỡ chữ: {settings.fontSize}px
            </label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={(value) => updateSetting("fontSize", value[0])}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Font chữ</label>
            <Select value={settings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Khoảng cách dòng: {settings.lineHeight}</label>
            <Slider
              value={[settings.lineHeight]}
              onValueChange={(value) => updateSetting("lineHeight", value[0])}
              min={1.2}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Palette className="h-4 w-4" />
              Chủ đề
            </label>
            <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Sáng</SelectItem>
                <SelectItem value="dark">Tối</SelectItem>
                <SelectItem value="sepia">Sepia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
