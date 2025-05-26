"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Bell } from "lucide-react"

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Register service worker with enhanced features
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)

          // Request notification permission
          if ("Notification" in window) {
            setNotificationPermission(Notification.permission)
          }
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallPrompt(false)

      // Request notification permission after install
      if ("Notification" in window && Notification.permission === "default") {
        const permission = await Notification.requestPermission()
        setNotificationPermission(permission)
      }
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === "granted") {
        new Notification("Thông báo đã được bật!", {
          body: "Bạn sẽ nhận được thông báo về sách mới và nhắc nhở đọc sách.",
          icon: "/icon-192x192.png",
        })
      }
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <Download className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Cài đặt ứng dụng</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Cài đặt ứng dụng để đọc sách offline, nhận thông báo và trải nghiệm tốt hơn
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={handleInstall} className="text-xs">
              Cài đặt
            </Button>
            {notificationPermission === "default" && (
              <Button size="sm" variant="outline" onClick={requestNotificationPermission} className="text-xs">
                <Bell className="h-3 w-3 mr-1" />
                Thông báo
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleDismiss} className="text-xs">
              Bỏ qua
            </Button>
          </div>
        </div>
        <Button size="sm" variant="ghost" onClick={handleDismiss} className="p-1 h-6 w-6">
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
