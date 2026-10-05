"use client"

import { useState } from "react"
import { Download, ExternalLink, FileText, Printer, ZoomIn, ZoomOut, Check, Sparkles } from "lucide-react"

interface ResumeProps {
  isDarkMode?: boolean
}

export default function Resume({ isDarkMode = true }: ResumeProps) {
  const [scale, setScale] = useState(100)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/Divya_Jyoty_Resume.pdf")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    const iframe = document.getElementById("resume-frame") as HTMLIFrameElement
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print()
    } else {
      window.open("/Divya_Jyoty_Resume.pdf", "_blank")
    }
  }

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100"
  const toolbarBg = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  const textColor = isDarkMode ? "text-white" : "text-gray-800"

  return (
    <div className={`h-full w-full flex flex-col ${bgColor} select-none overflow-hidden`}>
      {/* macOS Preview Toolbar */}
      <div className={`h-11 px-3 sm:px-4 border-b ${toolbarBg} flex items-center justify-between shadow-sm shrink-0`}>
        <div className="flex items-center gap-2 min-w-0 mr-2">
          <FileText className="w-4 h-4 text-red-500 shrink-0" />
          <span className={`text-xs font-semibold truncate ${textColor}`}>Divya_Jyoty_Resume.pdf</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-500/20 text-gray-400 hidden sm:inline">PDF Document</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setScale((s) => Math.max(70, s - 10))}
              className="p-1.5 rounded hover:bg-gray-500/20 text-gray-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-gray-400 font-mono w-10 text-center">{scale}%</span>
            <button
              onClick={() => setScale((s) => Math.min(150, s + 10))}
              className="p-1.5 rounded hover:bg-gray-500/20 text-gray-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <div className="h-4 w-px bg-gray-600/40 mx-1"></div>
          </div>

          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded hover:bg-gray-500/20 text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            title="Copy Direct Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
          </button>

          <a
            href="/Divya_Jyoty_Resume.pdf"
            download="Divya_Jyoty_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>

          <a
            href="/Divya_Jyoty_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-gray-500/20 text-gray-400 hover:text-white transition-colors"
            title="Open Fullscreen PDF"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile PDF helper banner */}
      <div className="sm:hidden p-2.5 bg-blue-900/30 border-b border-blue-500/30 flex items-center justify-between text-xs text-blue-200 shrink-0">
        <span>Previewing on mobile?</span>
        <a
          href="/Divya_Jyoty_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-semibold text-[11px] shadow-xs"
        >
          Open Fullscreen PDF
        </a>
      </div>

      {/* PDF Viewport */}
      <div className="flex-1 w-full bg-[#525659] flex justify-center p-2 sm:p-4 overflow-auto">
        <div
          className="w-full h-full max-w-4xl bg-white shadow-2xl rounded-sm transition-transform duration-200"
          style={{ transform: `scale(${scale / 100})`, transformOrigin: "top center" }}
        >
          <iframe
            id="resume-frame"
            src="/Divya_Jyoty_Resume.pdf#toolbar=0&navpanes=0"
            className="w-full h-full min-h-[500px] sm:min-h-[700px] border-0 rounded-sm"
            title="Divya Jyoty Resume"
          />
        </div>
      </div>
    </div>
  )
}
