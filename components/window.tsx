"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minus, ArrowRightIcon as ArrowsMaximize } from "lucide-react"
import type { AppWindow } from "@/types"
import Notes from "@/components/apps/notes"
import GitHub from "@/components/apps/github"
import Safari from "@/components/apps/safari"
import VSCode from "@/components/apps/vscode"
import FaceTime from "@/components/apps/facetime"
import Terminal from "@/components/apps/terminal"
import Mail from "@/components/apps/mail"
import YouTube from "@/components/apps/youtube"
import Spotify from "@/components/apps/spotify"
import Snake from "@/components/apps/snake"
import Weather from "@/components/apps/weather"
import Resume from "@/components/apps/resume"

const componentMap: Record<string, React.ComponentType<{ isDarkMode?: boolean }>> = {
  Notes,
  GitHub,
  Safari,
  VSCode,
  FaceTime,
  Terminal,
  Mail,
  YouTube,
  Spotify,
  Snake,
  Weather,
  Resume,
}

interface WindowProps {
  window: AppWindow
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  isDarkMode: boolean
}

export default function Window({ window, isActive, onClose, onFocus, isDarkMode }: WindowProps) {
  const [position, setPosition] = useState(window.position)
  const [size, setSize] = useState(window.size)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 })
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const windowRef = useRef<HTMLDivElement>(null)

  const AppComponent = componentMap[window.component]

  // Detect Mobile and Tablet screen sizes and adapt window geometry
  useEffect(() => {
    const handleScreenSize = () => {
      if (typeof globalThis.window === "undefined") return
      const w = globalThis.window.innerWidth
      const h = globalThis.window.innerHeight
      const mobile = w < 768
      const tablet = w >= 768 && w < 1024
      setIsMobile(mobile)
      setIsTablet(tablet)

      if (mobile) {
        setIsMaximized(true)
        setPosition({ x: 0, y: 26 })
        setSize({ width: w, height: h - 26 })
      } else if (tablet) {
        // Constrain window to tablet viewport
        const targetWidth = Math.min(size.width, w - 24)
        const targetHeight = Math.min(size.height, h - 90)
        setSize({ width: targetWidth, height: targetHeight })
        setPosition((prev) => ({
          x: Math.max(12, Math.min(prev.x, w - targetWidth - 12)),
          y: Math.max(28, Math.min(prev.y, h - 120)),
        }))
      }
    }

    handleScreenSize()
    globalThis.window.addEventListener("resize", handleScreenSize)
    return () => globalThis.window.removeEventListener("resize", handleScreenSize)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMobile) {
        const newX = Math.max(-size.width + 100, Math.min(e.clientX - dragOffset.x, globalThis.window.innerWidth - 80))
        const newY = Math.max(26, Math.min(e.clientY - dragOffset.y, globalThis.window.innerHeight - 60))
        setPosition({ x: newX, y: newY })
      } else if (isResizing && resizeDirection && !isMobile) {
        e.preventDefault()
        const dx = e.clientX - resizeStartPos.x
        const dy = e.clientY - resizeStartPos.y

        let newWidth = resizeStartSize.width
        let newHeight = resizeStartSize.height
        let newX = position.x
        let newY = position.y

        const minWidth = 320
        const minHeight = 220

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(minWidth, resizeStartSize.width + dx)
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(minHeight, resizeStartSize.height + dy)
        }
        if (resizeDirection.includes("w")) {
          const proposedWidth = resizeStartSize.width - dx
          if (proposedWidth >= minWidth) {
            newWidth = proposedWidth
            newX = position.x + dx
          }
        }
        if (resizeDirection.includes("n")) {
          const proposedHeight = resizeStartSize.height - dy
          if (proposedHeight >= minHeight) {
            newHeight = proposedHeight
            newY = position.y + dy
          }
        }

        setSize({ width: newWidth, height: newHeight })
        if (resizeDirection.includes("w") || resizeDirection.includes("n")) {
          setPosition({ x: newX, y: newY })
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return
      const touch = e.touches[0]
      if (isDragging && !isMobile) {
        const newX = Math.max(0, Math.min(touch.clientX - dragOffset.x, globalThis.window.innerWidth - 80))
        const newY = Math.max(26, Math.min(touch.clientY - dragOffset.y, globalThis.window.innerHeight - 60))
        setPosition({ x: newX, y: newY })
      }
    }

    const handleEnd = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleEnd)
      document.addEventListener("touchmove", handleTouchMove, { passive: true })
      document.addEventListener("touchend", handleEnd)
      document.addEventListener("touchcancel", handleEnd)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleEnd)
      document.removeEventListener("touchcancel", handleEnd)
    }
  }, [isDragging, dragOffset, isResizing, resizeDirection, resizeStartPos, resizeStartSize, position, size, isMobile])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return
    if ((e.target as HTMLElement).closest(".window-controls")) return

    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
    onFocus()
  }

  const handleTitleBarTouchStart = (e: React.TouchEvent) => {
    if (isMaximized || isMobile) return
    if ((e.target as HTMLElement).closest(".window-controls")) return
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      })
      onFocus()
    }
  }

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMobile) return
    e.preventDefault()
    e.stopPropagation()

    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStartPos({
      x: e.clientX,
      y: e.clientY,
    })
    setResizeStartSize({
      width: size.width,
      height: size.height,
    })
    onFocus()
  }

  const toggleMaximize = () => {
    if (isMobile) {
      onClose()
      return
    }

    if (isMaximized) {
      setPosition(preMaximizeState.position)
      setSize(preMaximizeState.size)
      setIsMaximized(false)
    } else {
      setPreMaximizeState({ position, size })
      const w = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1200
      const h = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 800
      setPosition({ x: 0, y: 26 })
      setSize({
        width: w,
        height: h - 26 - 68,
      })
      setIsMaximized(true)
    }
  }

  const handleMinimize = () => {
    onClose()
  }

  const titleBarClass = isDarkMode
    ? isActive
      ? "bg-gray-800"
      : "bg-gray-900"
    : isActive
      ? "bg-gray-200"
      : "bg-gray-100"

  const contentBgClass = isDarkMode ? "bg-gray-900" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-800"

  return (
    <div
      ref={windowRef}
      className={`absolute ${isMobile ? "rounded-none inset-x-0 bottom-0" : "rounded-lg shadow-2xl"} overflow-hidden transition-shadow ${
        isActive ? "shadow-2xl z-20" : "shadow-lg z-10"
      }`}
      style={
        isMobile
          ? {
              left: 0,
              top: "26px",
              width: "100%",
              height: "calc(100% - 26px)",
            }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }
      }
      onClick={onFocus}
    >
      {/* Title bar */}
      <div
        className={`h-9 sm:h-8 flex items-center px-3 ${titleBarClass} select-none touch-none`}
        onMouseDown={handleTitleBarMouseDown}
        onTouchStart={handleTitleBarTouchStart}
      >
        <div className="window-controls flex items-center space-x-2 mr-3 sm:mr-4">
          <button
            aria-label="Close"
            className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 active:scale-90 flex items-center justify-center cursor-pointer shadow-xs transition-transform"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="w-2.5 h-2.5 sm:w-2 sm:h-2 text-red-950 opacity-80 sm:opacity-0 hover:opacity-100" />
          </button>
          <button
            aria-label="Minimize"
            className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 active:scale-90 flex items-center justify-center cursor-pointer shadow-xs transition-transform"
            onClick={(e) => {
              e.stopPropagation()
              handleMinimize()
            }}
          >
            <Minus className="w-2.5 h-2.5 sm:w-2 sm:h-2 text-yellow-950 opacity-80 sm:opacity-0 hover:opacity-100" />
          </button>
          <button
            aria-label="Maximize"
            className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 active:scale-90 flex items-center justify-center cursor-pointer shadow-xs transition-transform"
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
          >
            <ArrowsMaximize className="w-2.5 h-2.5 sm:w-2 sm:h-2 text-green-950 opacity-80 sm:opacity-0 hover:opacity-100" />
          </button>
        </div>

        <div className={`flex-1 text-center text-xs sm:text-sm font-semibold truncate ${textClass}`}>
          {window.title}
        </div>

        <div className="w-12 sm:w-16 flex justify-end">
          {isMobile && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 text-[11px] rounded bg-white/10 hover:bg-white/20 text-gray-300 font-medium cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>

      {/* Window content */}
      <div className={`${contentBgClass} h-[calc(100%-2.25rem)] sm:h-[calc(100%-2rem)] overflow-auto overscroll-contain pb-24 sm:pb-0`}>
        {AppComponent ? <AppComponent isDarkMode={isDarkMode} /> : <div className="p-4">Content not available</div>}
      </div>

      {/* Resize handles - Desktop and Tablets */}
      {!isMaximized && !isMobile && (
        <>
          {/* Corner resize handles */}
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />

          {/* Edge resize handles */}
          <div
            className="absolute top-0 left-4 right-4 h-2 cursor-n-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize z-30"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />
        </>
      )}
    </div>
  )
}
