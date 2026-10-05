"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Star,
  Plus,
  Search,
  Wifi,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  Key,
  Code2,
  Cpu,
  Brain,
  Layers,
  ChevronRight,
  X,
  ArrowUpRight,
} from "lucide-react"
import { searchKnowledgeBase, ProjectKnowledge, AIResponse } from "@/lib/project-ai"

interface SafariProps {
  isDarkMode?: boolean
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  query?: string
  response?: AIResponse
  text?: string
  timestamp: string
}

export default function Safari({ isDarkMode = true }: SafariProps) {
  const [url, setUrl] = useState("https://safari.apple/ai-search")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"home" | "ai">("ai")
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [thinkingStep, setThinkingStep] = useState<string>("")
  const [customApiKey, setCustomApiKey] = useState("")
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const chatBottomRef = useRef<HTMLDivElement>(null)

  // Default pre-seeded conversation showcasing Safari LLM Project Intelligence
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "intro-msg",
      role: "assistant",
      timestamp: "Just now",
      response: {
        answer: `### 👋 Welcome to Safari AI Project Intelligence!

I am Divya Jyoty's interactive AI assistant, grounded in his **10 open-source repositories**, technical architecture specifications, benchmark results, and engineering achievements.

#### 💡 What you can ask me:
- **CUDA & GPU Benchmarks**: *"How does the GPU Inference Benchmark achieve 35% speedup with custom CUDA kernels?"*
- **Multi-Agent Simulation**: *"How does trust modeling work in Collective-Intelligence across 1,000 rounds?"*
- **Reinforcement Learning**: *"Explain the 1,152 state MDP in Selective-Intelligence"*
- **Full-Stack Architecture**: *"What tech stack and WebSockets design powers Skill-Swap-Hub?"*
- **Credentials & Experience**: *"What are Divya's AWS certifications, hackathon awards, and IBM internship work?"*

Type your question in the search bar above or choose a suggested topic below!`,
        referencedProjects: [],
        keyMetrics: [
          "10 GitHub Repositories",
          "35% Speedup with CUDA Kernels",
          "32.8 Collaborative Simulation Reward",
          "1,152 Discrete RL States",
        ],
        suggestedQuestions: [
          "How did custom CUDA preprocessing kernels achieve a 35% speedup?",
          "Explain the multi-agent trust dynamics in Collective-Intelligence",
          "What stack and database architecture powers Skill-Swap-Hub?",
          "Summarize Divya's research, education, and AWS certifications",
        ],
        thinkingSteps: [
          "Loaded Divya Jyoty Project Knowledge Base",
          "Indexed 10 repositories and technical metrics",
          "Safari AI Engine ready for inquiries",
        ],
      },
    },
  ])

  useEffect(() => {
    const checkWifiStatus = () => {
      const status = localStorage.getItem("wifiEnabled")
      setWifiEnabled(status === null ? true : status === "true")
    }

    checkWifiStatus()
    const interval = setInterval(checkWifiStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom of chat when new message arrives
    if (activeTab === "ai") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages, isAiThinking, activeTab])

  // Theme Colors
  const textColor = isDarkMode ? "text-white" : "text-[#1f2328]"
  const subtextColor = isDarkMode ? "text-gray-300" : "text-[#4b5563]"
  const bgColor = isDarkMode ? "bg-[#0d1117]" : "bg-[#f6f8fa]"
  const toolbarBg = isDarkMode ? "bg-[#161b22]" : "bg-[#ffffff]"
  const inputBg = isDarkMode ? "bg-[#21262d] text-white" : "bg-[#f3f4f6] text-[#1f2328]"
  const borderColor = isDarkMode ? "border-[#30363d]" : "border-[#d0d7de]"
  const cardBg = isDarkMode ? "bg-[#161b22] border-[#30363d]" : "bg-white border-[#d0d7de] shadow-sm"
  const hoverBg = isDarkMode ? "hover:bg-[#21262d]" : "hover:bg-[#f3f4f6]"

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }

  // Execute AI Search Query
  const handleExecuteSearch = async (queryText: string) => {
    const cleanQuery = queryText.trim()
    if (!cleanQuery) return

    // If user enters an external website URL, open it or handle it
    if (
      cleanQuery.startsWith("http://") ||
      cleanQuery.startsWith("https://") ||
      cleanQuery.includes(".com") ||
      cleanQuery.includes(".org") ||
      cleanQuery.includes(".io")
    ) {
      if (!cleanQuery.includes("github.com/jyotydivya") && !cleanQuery.includes("safari")) {
        window.open(cleanQuery.startsWith("http") ? cleanQuery : `https://${cleanQuery}`, "_blank")
        return
      }
    }

    // Switch to AI tab and update URL bar
    setActiveTab("ai")
    setUrl(`safari://ai-search?q=${encodeURIComponent(cleanQuery)}`)
    setSearchQuery("")

    // Add user message to conversation
    const userMsgId = `user-${Date.now()}`
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      text: cleanQuery,
      timestamp: "Just now",
    }

    setChatMessages((prev) => [...prev, newUserMsg])
    setIsAiThinking(true)
    setThinkingStep("Analyzing query semantics and locating relevant repositories...")

    try {
      // Step simulation for realistic LLM reasoning feel
      setTimeout(() => {
        setThinkingStep("Extracting technical architecture, benchmarks, and mathematical models...")
      }, 300)

      // Try calling our server-side API (with optional custom Gemini API key)
      const res = await fetch("/api/safari-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: cleanQuery,
          customApiKey: customApiKey || undefined,
        }),
      })

      let aiResult: AIResponse
      if (res.ok) {
        aiResult = await res.json()
      } else {
        // Fallback to client-side knowledge engine
        aiResult = searchKnowledgeBase(cleanQuery)
      }

      setTimeout(() => {
        const assistantMsgId = `assistant-${Date.now()}`
        const newAssistantMsg: ChatMessage = {
          id: assistantMsgId,
          role: "assistant",
          query: cleanQuery,
          response: aiResult,
          timestamp: "Just now",
        }

        setChatMessages((prev) => [...prev, newAssistantMsg])
        setIsAiThinking(false)
        setThinkingStep("")
      }, 500)
    } catch {
      // Offline/Local Fallback
      const localResult = searchKnowledgeBase(cleanQuery)
      const assistantMsgId = `assistant-${Date.now()}`
      const newAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: "assistant",
        query: cleanQuery,
        response: localResult,
        timestamp: "Just now",
      }

      setChatMessages((prev) => [...prev, newAssistantMsg])
      setIsAiThinking(false)
      setThinkingStep("")
    }
  }

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const suggestedPills = [
    { label: "🚀 GPU Inference 35% Speedup", query: "How does the GPU Inference Benchmark achieve 35% speedup with custom CUDA kernels?" },
    { label: "🧠 Collective Intelligence Trust", query: "Explain the multi-agent trust dynamics in Collective-Intelligence across 1000 rounds" },
    { label: "🎯 Selective Intelligence RL", query: "Explain the 1,152 state MDP environment in Selective-Intelligence" },
    { label: "⚡ Skill-Swap-Hub Architecture", query: "What tech stack and WebSockets design powers Skill-Swap-Hub?" },
    { label: "🏆 AWS Certifications & Awards", query: "What are Divya's AWS certifications, hackathon awards, and IBM internship work?" },
  ]

  const socialLinks = [
    {
      title: "GitHub",
      url: "https://github.com/jyotydivya",
      icon: "/github.png",
      color: "bg-gray-800 text-white",
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/in/divya-jyoty",
      icon: "/linkedin.png",
      color: "bg-blue-600 text-white",
    },
    {
      title: "Email",
      url: "mailto:jyotydivya844@gmail.com",
      icon: "/mail.png",
      color: "bg-red-500 text-white",
    },
    {
      title: "Resume PDF",
      url: "/Divya_Jyoty_Resume.pdf",
      icon: "/notes.png",
      color: "bg-emerald-600 text-white",
    },
  ]

  const featuredProjects = [
    {
      title: "GPU Inference Benchmarking",
      tags: "PyTorch · CUDA C++ · TensorRT · FastAPI · Streamlit",
      desc: "Deep learning benchmarking across CPU, PyTorch CUDA, and TensorRT. Custom CUDA preprocessing kernels achieved 35% throughput acceleration with 18% higher GPU utilization via cuDNN.",
      url: "https://github.com/jyotydivya/GPU-Accelerated-ML-Inference-Benchmark",
      prompt: "Tell me all about the GPU-Accelerated ML Inference Benchmark project",
    },
    {
      title: "Collective Intelligence Simulator",
      tags: "Python · Multi-Agent · NumPy · Matplotlib · Stochastic",
      desc: "Multi-agent simulation of 1,000 rounds where diverse human agents and AI collaborate. Humans + AI reached 32.8 reward, preventing collapse when AI alone dropped to 13.0.",
      url: "https://github.com/jyotydivya/Collective-Intelligence",
      prompt: "Explain the multi-agent trust dynamics in Collective-Intelligence",
    },
    {
      title: "Skill Swap Hub",
      tags: "React.js · Node.js · Express.js · MongoDB · WebSockets · Razorpay",
      desc: "Full-stack skill marketplace with 7-collection relational DB schema, persistent real-time WebSockets chat (50% latency drop), and Razorpay HMAC-SHA256 payments.",
      url: "https://github.com/jyotydivya/Skill-Swap-Hub",
      prompt: "What stack and database architecture powers Skill-Swap-Hub?",
    },
  ]

  const handleOpenLink = (targetUrl: string) => {
    setUrl(targetUrl)
    if (targetUrl.startsWith("http") || targetUrl.startsWith("mailto") || targetUrl.endsWith(".pdf")) {
      window.open(targetUrl, "_blank")
    }
  }

  const NoInternetView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div
        className={`w-24 h-24 mb-6 flex items-center justify-center rounded-full ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <Wifi className={`w-12 h-12 ${isDarkMode ? "text-gray-600" : "text-gray-500"}`} />
      </div>
      <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>You Are Not Connected to the Internet</h2>
      <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
        This page can't be displayed because your computer is currently offline.
      </p>
      <button
        className={`px-4 py-2 rounded ${
          isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onClick={handleRefresh}
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor} select-text overflow-hidden font-sans`}>
      {/* Settings Modal (Optional Gemini API Key) */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl ${cardBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-500/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-base">Safari AI Configuration</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs ${subtextColor} mb-4 leading-relaxed`}>
              Safari AI runs a built-in <strong>Deep Project Knowledge & RAG Engine</strong> with zero configuration. You can optionally add a Google Gemini API Key for live external model execution.
            </p>

            <div className="space-y-3">
              <label className="text-xs font-semibold block">Google Gemini API Key (Optional)</label>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customApiKey}
                  onChange={(e) => setCustomApiKey(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <p className="text-[11px] text-gray-500">
                Your key stays local in your browser session. If empty, the built-in comprehensive RAG engine answers all project queries.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safari Navigation Toolbar */}
      <div className={`${toolbarBg} border-b ${borderColor} px-3 py-2 flex items-center gap-2 shrink-0 select-none shadow-sm`}>
        <div className="flex items-center gap-1">
          <button
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400`}
            onClick={() => setActiveTab("home")}
            title="Go to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400`}
            onClick={() => setActiveTab("ai")}
            title="Go to Safari AI"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            onClick={handleRefresh}
            title="Reload Page"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            onClick={() => {
              setActiveTab("home")
              setUrl("https://github.com/jyotydivya")
            }}
            title="Home Page"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Safari Smart Search / Address Bar with AI Badge */}
        <div className={`flex-1 flex items-center ${inputBg} rounded-xl px-3 py-1.5 border border-transparent focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all shadow-inner`}>
          <div className="flex items-center gap-1.5 mr-2 shrink-0">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-[11px] font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
              Safari AI
            </span>
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleExecuteSearch(url)
              }
            }}
            placeholder="Ask questions about Divya's projects, CUDA kernels, multi-agent AI, or enter URL..."
            className={`w-full bg-transparent focus:outline-none text-xs sm:text-[13px] ${textColor}`}
          />

          <button
            onClick={() => handleExecuteSearch(url)}
            className="p-1 hover:text-purple-400 text-gray-400 transition-colors shrink-0"
            title="Search with Safari AI"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettingsModal(true)}
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400 hover:text-purple-400 transition-colors`}
            title="Configure Safari AI"
          >
            <Key className="w-4 h-4" />
          </button>
          <button
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400`}
            onClick={() => setActiveTab("ai")}
            title="Open AI Assistant"
          >
            <Star className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Safari Tab Bar */}
      <div className={`${toolbarBg} border-b ${borderColor} px-2 flex items-center gap-1 shrink-0 select-none`}>
        {/* Tab 1: Safari AI Tab */}
        <div
          onClick={() => {
            setActiveTab("ai")
            setUrl("https://safari.apple/ai-search")
          }}
          className={`px-4 py-1.5 text-xs rounded-t-lg flex items-center gap-2 cursor-pointer transition-colors ${
            activeTab === "ai"
              ? isDarkMode
                ? "bg-[#0d1117] text-white font-semibold border-t-2 border-t-purple-500"
                : "bg-[#f6f8fa] text-[#1f2328] font-bold border-t-2 border-t-purple-500 shadow-xs"
              : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-2 h-2 text-white" />
          </div>
          <span>Safari AI — Project Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Tab 2: Home Portfolio Tab */}
        <div
          onClick={() => {
            setActiveTab("home")
            setUrl("https://github.com/jyotydivya")
          }}
          className={`px-4 py-1.5 text-xs rounded-t-lg flex items-center gap-2 cursor-pointer transition-colors ${
            activeTab === "home"
              ? isDarkMode
                ? "bg-[#0d1117] text-white font-semibold border-t-2 border-t-blue-500"
                : "bg-[#f6f8fa] text-[#1f2328] font-bold border-t-2 border-t-blue-500 shadow-xs"
              : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
          }`}
        >
          <Home className="w-3.5 h-3.5 text-blue-400" />
          <span>Divya Jyoty — Portfolio</span>
        </div>

        <button
          onClick={() => {
            setActiveTab("ai")
            handleExecuteSearch("Give me an overview of all 10 projects")
          }}
          className={`p-1 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400 ml-1`}
          title="New AI Inquiry"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Safari Window Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!wifiEnabled ? (
          <NoInternetView />
        ) : activeTab === "ai" ? (
          /* ========================================================================= */
          /* SAFARI AI PROJECT INTELLIGENCE VIEW                                       */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Conversation Messages Scroll Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* AI Header Banner */}
                <div
                  className={`p-6 rounded-2xl border ${cardBg} shadow-sm relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-md">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <span>Safari Project Intelligence</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
                          Apple Intelligence
                        </span>
                      </h2>
                      <p className={`text-xs ${subtextColor}`}>
                        Ask any technical or architectural question grounded in Divya Jyoty's engineering repositories.
                      </p>
                    </div>
                  </div>

                  {/* Suggested Question Pills */}
                  <div className="mt-4 pt-3 border-t border-gray-500/15">
                    <span className="text-[11px] font-semibold text-gray-400 block mb-2">
                      Suggested Project Inquiries:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {suggestedPills.map((pill, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleExecuteSearch(pill.query)}
                          className={`text-xs px-3 py-1.5 rounded-lg border ${borderColor} transition-all cursor-pointer text-left ${
                            isDarkMode
                              ? "bg-[#21262d] hover:bg-purple-950/40 hover:border-purple-500/50 text-gray-200"
                              : "bg-white hover:bg-purple-50 hover:border-purple-300 text-gray-800 shadow-xs"
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Conversation Thread */}
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-4 animate-in fade-in duration-200">
                    {/* User Question Bubble */}
                    {msg.role === "user" && (
                      <div className="flex justify-end items-start gap-3">
                        <div className="max-w-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-sm shadow-md text-sm leading-relaxed">
                          <p className="font-medium">{msg.text}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <User className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* AI Response Card */}
                    {msg.role === "assistant" && msg.response && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md">
                          <Bot className="w-4 h-4" />
                        </div>

                        <div className={`flex-1 max-w-3xl p-5 sm:p-6 rounded-2xl border ${cardBg} shadow-sm space-y-4`}>
                          {/* Top Meta info */}
                          <div className="flex items-center justify-between pb-3 border-b border-gray-500/15 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-purple-400 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Safari AI Overview</span>
                              </span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-500">Divya Jyoty Knowledge Base</span>
                            </div>

                            <button
                              onClick={() => handleCopyText(msg.id, msg.response?.answer || "")}
                              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer text-[11px]"
                              title="Copy Answer"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Markdown formatted response body */}
                          <div className={`text-sm leading-relaxed space-y-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                            {msg.response.answer.split("\n\n").map((paragraph, pIdx) => {
                              // If header
                              if (paragraph.startsWith("### ")) {
                                return (
                                  <h3 key={pIdx} className="text-base font-bold text-purple-400 pt-1">
                                    {paragraph.replace("### ", "")}
                                  </h3>
                                )
                              }
                              if (paragraph.startsWith("#### ")) {
                                return (
                                  <h4 key={pIdx} className="text-sm font-bold text-blue-400 pt-1 uppercase tracking-wide">
                                    {paragraph.replace("#### ", "")}
                                  </h4>
                                )
                              }
                              // If code block
                              if (paragraph.startsWith("```")) {
                                const cleanCode = paragraph.replace(/```[a-z]*\n?/g, "")
                                return (
                                  <pre
                                    key={pIdx}
                                    className="p-3.5 rounded-xl bg-black/40 text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed border border-gray-700/60"
                                  >
                                    {cleanCode}
                                  </pre>
                                )
                              }
                              // If bullet list
                              if (paragraph.includes("\n- ") || paragraph.startsWith("- ")) {
                                const items = paragraph.split("\n- ").map((item) => item.replace(/^- /, ""))
                                return (
                                  <ul key={pIdx} className="space-y-1.5 pl-2">
                                    {items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                                        <span className="text-purple-400 shrink-0 font-bold">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )
                              }

                              return (
                                <p key={pIdx} className="text-xs sm:text-sm leading-relaxed opacity-95">
                                  {paragraph}
                                </p>
                              )
                            })}
                          </div>

                          {/* Key Metrics Chips */}
                          {msg.response.keyMetrics && msg.response.keyMetrics.length > 0 && (
                            <div className="pt-3 border-t border-gray-500/15">
                              <span className="text-[11px] font-semibold text-gray-400 block mb-2">
                                Key Engineering Metrics:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {msg.response.keyMetrics.map((metric, mIdx) => (
                                  <span
                                    key={mIdx}
                                    className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-medium border border-emerald-500/20"
                                  >
                                    ✓ {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Referenced Repositories Cards */}
                          {msg.response.referencedProjects && msg.response.referencedProjects.length > 0 && (
                            <div className="pt-3 border-t border-gray-500/15">
                              <span className="text-[11px] font-semibold text-gray-400 block mb-2">
                                Verified Project Sources:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {msg.response.referencedProjects.map((proj) => (
                                  <a
                                    key={proj.id}
                                    href={proj.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-xl border ${borderColor} ${hoverBg} flex items-start justify-between group transition-all`}
                                  >
                                    <div>
                                      <h5 className="text-xs font-bold text-blue-400 group-hover:underline flex items-center gap-1">
                                        <span>{proj.title}</span>
                                        <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                      </h5>
                                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                                        {proj.shortDesc}
                                      </p>
                                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                        {proj.techStack.slice(0, 3).map((tech, tIdx) => (
                                          <span
                                            key={tIdx}
                                            className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 text-gray-300 font-mono"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    <Github className="w-4 h-4 text-gray-500 group-hover:text-white shrink-0 ml-2" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Suggested Next Questions */}
                          {msg.response.suggestedQuestions && msg.response.suggestedQuestions.length > 0 && (
                            <div className="pt-3 border-t border-gray-500/15">
                              <span className="text-[11px] font-semibold text-purple-400 block mb-2">
                                Ask Follow-Up Question:
                              </span>
                              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                                {msg.response.suggestedQuestions.map((qText, qIdx) => (
                                  <button
                                    key={qIdx}
                                    onClick={() => handleExecuteSearch(qText)}
                                    className={`text-xs px-3 py-1.5 rounded-lg border ${borderColor} transition-all text-left flex items-center justify-between gap-2 cursor-pointer ${
                                      isDarkMode
                                        ? "bg-purple-950/20 hover:bg-purple-900/40 text-purple-200 border-purple-500/30"
                                        : "bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200"
                                    }`}
                                  >
                                    <span>{qText}</span>
                                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* AI Thinking Animation State */}
                {isAiThinking && (
                  <div className="flex items-start gap-3 animate-in fade-in duration-200">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-md animate-pulse">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className={`p-4 rounded-2xl border ${cardBg} max-w-lg space-y-2`}>
                      <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Safari AI Reasoning...</span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono animate-pulse">
                        {thinkingStep || "Synthesizing project repository details..."}
                      </p>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>
            </div>

            {/* Bottom Floating Interactive Search Input */}
            <div className={`p-4 border-t ${borderColor} ${toolbarBg} shrink-0`}>
              <div className="max-w-4xl mx-auto flex items-center gap-2">
                <div className={`flex-1 flex items-center ${inputBg} rounded-2xl px-4 py-2.5 border ${borderColor} focus-within:ring-2 focus-within:ring-purple-500/30 transition-all shadow-md`}>
                  <Sparkles className="w-4 h-4 text-purple-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        handleExecuteSearch(searchQuery)
                      }
                    }}
                    placeholder="Ask about Divya's CUDA benchmarks, multi-agent simulations, or WebSockets..."
                    className={`w-full bg-transparent focus:outline-none text-xs sm:text-sm ${textColor}`}
                  />
                  <button
                    onClick={() => {
                      if (searchQuery.trim()) {
                        handleExecuteSearch(searchQuery)
                      }
                    }}
                    disabled={!searchQuery.trim() || isAiThinking}
                    className="p-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white transition-all shrink-0 cursor-pointer ml-2"
                    title="Send Question"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* HOME TAB (PORTFOLIO OVERVIEW & QUICK PROJECT INQUIRIES)                   */
          /* ========================================================================= */
          <div className="flex-1 overflow-auto p-6 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero / About Card */}
              <div className={`p-6 rounded-2xl ${cardBg} border ${borderColor} shadow-lg`}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shrink-0">
                    <span className="text-white text-3xl font-bold">DJ</span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold mb-1">Divya Jyoty</h1>
                    <p className="text-sm text-purple-400 font-medium mb-3">
                      AI Engineer & B.Tech CSE @ VIT-AP (CGPA 9.39) · 2x Hackathon Winner at IIT Hyderabad
                    </p>
                    <p className={`text-sm ${subtextColor} leading-relaxed mb-4`}>
                      Experienced in architecting deep learning inference benchmarking suites (CUDA, TensorRT, PyTorch),
                      designing multi-agent stochastic simulations, and developing scalable full-stack applications.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                      <button
                        onClick={() => {
                          setActiveTab("ai")
                          handleExecuteSearch("Summarize Divya Jyoty's engineering skills and achievements")
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Ask Safari AI Assistant</span>
                      </button>

                      <a
                        href="https://github.com/jyotydivya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href="/Divya_Jyoty_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow"
                      >
                        <FileText className="w-4 h-4" />
                        <span>View Resume (PDF)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect & Links */}
              <div>
                <h2 className="text-base font-bold mb-3 flex items-center gap-2">
                  <span>Connect & Profiles</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {socialLinks.map((link, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-4 rounded-xl border ${borderColor} ${cardBg} ${hoverBg} cursor-pointer transition-all hover:scale-[1.02] shadow-sm`}
                      onClick={() => handleOpenLink(link.url)}
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2 overflow-hidden shadow-xs">
                        <img src={link.icon || "/placeholder.svg"} alt={link.title} className="w-7 h-7 object-contain" />
                      </div>
                      <span className="text-xs font-semibold text-center">{link.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects with AI inquiry buttons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold">Featured Projects</h2>
                  <button
                    onClick={() => {
                      setActiveTab("ai")
                      handleExecuteSearch("Give me a technical breakdown of all 10 projects")
                    }}
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze with Safari AI</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {featuredProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border ${borderColor} ${cardBg} flex flex-col justify-between hover:shadow-lg transition-all`}
                    >
                      <div>
                        <h3 className="text-sm font-bold mb-1 text-indigo-400">{proj.title}</h3>
                        <p className="text-[11px] text-gray-400 font-mono mb-2">{proj.tags}</p>
                        <p className={`text-xs ${subtextColor} leading-relaxed mb-4`}>{proj.desc}</p>
                      </div>

                      <div className="space-y-2 mt-auto pt-3 border-t border-gray-500/15">
                        <button
                          onClick={() => {
                            setActiveTab("ai")
                            handleExecuteSearch(proj.prompt)
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-purple-600/15 hover:bg-purple-600/25 text-purple-400 text-xs font-semibold border border-purple-500/30 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ask AI About This Project</span>
                        </button>

                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
