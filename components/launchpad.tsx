"use client"

import { useState, useEffect } from "react"
import type { AppWindow } from "@/types"

// Same apps as dock, except launchpad itself
const launchpadApps = [
  { id: "safari", title: "Safari", icon: "/safari.png", component: "Safari" },
  { id: "mail", title: "Mail", icon: "/mail.png", component: "Mail" },
  { id: "vscode", title: "VS Code", icon: "/vscode.png", component: "VSCode" },
  { id: "notes", title: "Notes", icon: "/notes.png", component: "Notes" },
  { id: "resume", title: "Resume (PDF)", icon: "/resume.svg", component: "Resume" },
  { id: "facetime", title: "FaceTime", icon: "/facetime.png", component: "FaceTime" },
  { id: "terminal", title: "Terminal", icon: "/terminal.png", component: "Terminal" },
  { id: "github", title: "GitHub", icon: "/github.png", component: "GitHub" },
  { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube" },
  { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify" },
  { id: "snake", title: "Snake", icon: "/snake.png", component: "Snake" },
  { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather" },
]

interface LaunchpadProps {
  onAppClick: (app: AppWindow) => void
  onClose: () => void
}

// Improve Launchpad appearance
export default function Launchpad({ onAppClick, onClose }: LaunchpadProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredApps, setFilteredApps] = useState(launchpadApps)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation effect
    setIsVisible(true)

    if (searchTerm) {
      setFilteredApps(launchpadApps.filter((app) => app.title.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setFilteredApps(launchpadApps)
    }
  }, [searchTerm])

  const handleAppClick = (app: (typeof launchpadApps)[0]) => {
    const w = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1200
    const h = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 800
    const isWideApp = app.id === "vscode" || app.id === "resume" || app.id === "mail" || app.id === "safari"

    const size =
      w < 768
        ? { width: w, height: h - 26 }
        : w < 1024
          ? { width: Math.min(isWideApp ? 920 : 780, w - 24), height: Math.min(640, h - 80) }
          : isWideApp
            ? { width: 960, height: 650 }
            : { width: 800, height: 600 }

    const position =
      w < 768
        ? { x: 0, y: 26 }
        : w < 1024
          ? { x: Math.max(12, Math.floor((w - size.width) / 2)), y: 36 }
          : { x: Math.random() * 100 + 80, y: Math.random() * 50 + 40 }

    onAppClick({
      id: app.id,
      title: app.title,
      component: app.component,
      position,
      size,
    })
    onClose()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-md z-40 flex flex-col items-center justify-center
        transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-4xl px-4 sm:px-8 py-8 sm:py-12 transition-transform duration-300 max-h-[90vh] overflow-y-auto ${
          isVisible ? "translate-y-0" : "translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-64 max-w-[80vw] mx-auto mb-8 sm:mb-12">
          <input
            type="text"
            placeholder="Search apps..."
            className="w-full bg-white/20 backdrop-blur-md text-white border-0 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform"
              onClick={() => handleAppClick(app)}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-1.5 sm:mb-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <img src={app.icon || "/placeholder.svg"} alt={app.title} className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow" />
              </div>
              <span className="text-white text-xs sm:text-sm text-center drop-shadow truncate max-w-full px-1">{app.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
