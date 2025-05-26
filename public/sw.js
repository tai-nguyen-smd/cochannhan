const CACHE_NAME = "ebook-reader-v2"
const CONTENT_CACHE = "ebook-content"
const urlsToCache = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png", "/offline.html"]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== CONTENT_CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event with offline support
self.addEventListener("fetch", (event) => {
  // Handle book content requests
  if (event.request.url.includes("/api/books/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            caches.open(CONTENT_CACHE).then((cache) => {
              cache.put(event.request, responseToCache)
            })

            return response
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === "navigate") {
              return caches.match("/offline.html")
            }
          })
      }),
    )
    return
  }

  // Handle other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }

      return fetch(event.request).catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html")
        }
      })
    }),
  )
})

// Background sync for reading progress
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync-progress") {
    event.waitUntil(syncReadingProgress())
  }
})

async function syncReadingProgress() {
  try {
    // Get stored progress data
    const progressData = await getStoredProgressData()

    if (progressData && navigator.onLine) {
      // Sync with server when online
      await fetch("/api/sync-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(progressData),
      })
    }
  } catch (error) {
    console.error("Error syncing progress:", error)
  }
}

async function getStoredProgressData() {
  // This would get progress data from IndexedDB or localStorage
  // For now, return null as we're using localStorage directly
  return null
}

// Push notifications for reading reminders
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Đã có chương mới để đọc!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "explore",
        title: "Đọc ngay",
        icon: "/icon-192x192.png",
      },
      {
        action: "close",
        title: "Đóng",
        icon: "/icon-192x192.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Thư Viện Sách", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/"))
  }
})
