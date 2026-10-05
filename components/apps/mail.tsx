"use client"

import { useState } from "react"
import { Mail, Send, ExternalLink, Check, Copy, Phone, MapPin, Linkedin, Github } from "lucide-react"

interface MailProps {
  isDarkMode?: boolean
}

export default function MailApp({ isDarkMode = true }: MailProps) {
  const [copied, setCopied] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const email = "jyotydivya844@gmail.com"
  const phone = "+91 9386179234"

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const cardBg = isDarkMode ? "bg-gray-800/80 border-gray-700" : "bg-gray-50 border-gray-200"
  const inputBg = isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = mailto
  }

  return (
    <div className={`h-full ${bgColor} ${textColor} p-6 overflow-auto flex flex-col items-center justify-center`}>
      <div className="max-w-xl w-full space-y-6">
        {/* Header Card */}
        <div className={`p-6 rounded-2xl border ${cardBg} shadow-lg text-center`}>
          <div className="w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-4 shadow">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Get in Touch with Divya</h2>
          <p className="text-sm opacity-80 mb-4">
            Have an opportunity, collaboration, or question? Send a message directly!
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-mono mb-4">
            <span>{email}</span>
            <button
              onClick={handleCopyEmail}
              className="p-1 hover:bg-blue-500/20 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs opacity-75">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-green-400" />
              {phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              Amaravati, Andhra Pradesh
            </span>
          </div>
        </div>

        {/* Compose Form */}
        <form onSubmit={handleSend} className={`p-6 rounded-2xl border ${cardBg} shadow-lg space-y-4`}>
          <h3 className="font-semibold text-sm tracking-wide uppercase opacity-75">Quick Message</h3>

          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Subject</label>
            <input
              type="text"
              placeholder="e.g. AI Internship Opportunity / Collaboration"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1 opacity-80">Message</label>
            <textarea
              rows={4}
              placeholder="Hi Divya, I came across your portfolio and..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${inputBg}`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Open in Mail Client</span>
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-center gap-4 text-xs opacity-80">
          <a
            href="https://linkedin.com/in/divya-jyoty"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-400"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/jyotydivya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-purple-400"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
