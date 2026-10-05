"use client"

import { useState } from "react"
import {
  Mail,
  Inbox,
  Send,
  Archive,
  Trash2,
  Star,
  Search,
  Edit3,
  Reply,
  Forward,
  Paperclip,
  Check,
  Copy,
  Phone,
  MapPin,
  ExternalLink,
  User,
  CheckCircle2,
  Tag,
  Clock,
  RefreshCw,
  Sparkles,
  ChevronLeft,
} from "lucide-react"

interface MailProps {
  isDarkMode?: boolean
}

interface EmailItem {
  id: string
  sender: string
  email: string
  avatarColor: string
  subject: string
  preview: string
  body: string[]
  date: string
  time: string
  isUnread: boolean
  isStarred: boolean
  folder: "inbox" | "sent" | "starred" | "archive" | "trash"
  tag?: string
  tagColor?: string
}

export default function MailApp({ isDarkMode = true }: MailProps) {
  const [activeFolder, setActiveFolder] = useState<"inbox" | "sent" | "starred" | "archive" | "trash">("inbox")
  const [selectedEmailId, setSelectedEmailId] = useState<string>("email-1")
  const [isComposing, setIsComposing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sentSuccess, setSentSuccess] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [mobileView, setMobileView] = useState<"list" | "detail">("list")

  // Compose State
  const [composeFrom, setComposeFrom] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")

  const myEmail = "jyotydivya844@gmail.com"
  const myPhone = "+91 93418 20844"

  // Pre-populated realistic email threads grounded in Divya's achievements
  const [emails, setEmails] = useState<EmailItem[]>([
    {
      id: "email-1",
      sender: "IIT Hyderabad Hackathon Jury",
      email: "hackathon@iith.ac.in",
      avatarColor: "bg-amber-600",
      subject: "🏆 Congratulations: 1st Place Award Winner Announcement!",
      preview: "Dear Divya Jyoty, on behalf of the organizing committee, we are thrilled to announce your team has won...",
      body: [
        "Dear Divya Jyoty,",
        "On behalf of the judging panel and the organizing committee of the National Hackathon at IIT Hyderabad, we are thrilled to congratulate you on securing 1st Place in the AI & Web Innovation Track!",
        "The evaluation panel was deeply impressed by your architectural execution, technical depth in real-time multi-agent processing, and seamless user experience.",
        "Your prize certificate and official winner memento details have been processed. Please verify your contact details and bank details for the prize distribution.",
        "Warm regards,",
        "IIT Hyderabad Innovation Committee",
      ],
      date: "Oct 2",
      time: "10:30 AM",
      isUnread: false,
      isStarred: true,
      folder: "inbox",
      tag: "Hackathon",
      tagColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    {
      id: "email-2",
      sender: "Deep Learning Systems Research Group",
      email: "research@dlsystems.org",
      avatarColor: "bg-blue-600",
      subject: "⚡ Feedback on GPU-Accelerated ML Inference Benchmark",
      preview: "Hi Divya, we reviewed your custom CUDA preprocessing kernels and the 35% throughput acceleration...",
      body: [
        "Hi Divya,",
        "We reviewed your open-source repository 'GPU-Accelerated-ML-Inference-Benchmark' on GitHub. The memory-coalescing shared memory optimizations you implemented for image normalization are exemplary.",
        "Achieving a 35% throughput speedup over standard OpenCV pipelines while raising GPU utilization by 18% with cuDNN execution streams demonstrates high-caliber systems engineering.",
        "We would love to know if you have explored FP8 precision quantization on NVIDIA Hopper/Ada architectures or if you are planning to extend this to distributed vLLM serving.",
        "Keep up the exceptional engineering work!",
        "Dr. Marcus Vance — Systems AI Researcher",
      ],
      date: "Oct 1",
      time: "3:45 PM",
      isUnread: true,
      isStarred: true,
      folder: "inbox",
      tag: "Research",
      tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    {
      id: "email-3",
      sender: "IBM – Adroit Technologies Mentorship",
      email: "internships@adroit-technologies.com",
      avatarColor: "bg-purple-600",
      subject: "🌟 Internship Commendation & Generative AI Project Delivery",
      preview: "Dear Divya, thank you for your exceptional contributions to the enterprise Google Gemini RAG pipeline...",
      body: [
        "Dear Divya,",
        "Thank you for your outstanding dedication during your tenure as an AI Software Engineer Intern at IBM – Adroit Technologies.",
        "Your contribution developing enterprise generative AI microservices with Google Gemini API, Flask, and Docker was pivotal in reducing document analysis latency by 45% for our unstructured enterprise PDF pipeline.",
        "Your Letter of Recommendation and Internship Certificate have been verified and dispatched. We wish you continued success as you complete your B.Tech at VIT-AP.",
        "Sincerely,",
        "Engineering Management Team, IBM – Adroit Technologies",
      ],
      date: "Sep 28",
      time: "11:15 AM",
      isUnread: false,
      isStarred: false,
      folder: "inbox",
      tag: "Internship",
      tagColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    },
    {
      id: "email-4",
      sender: "AWS Training & Certification",
      email: "credentials@certmetrics.com",
      avatarColor: "bg-emerald-600",
      subject: "🎓 Official Credential Verified: AWS Certified AI Practitioner",
      preview: "Congratulations Divya Jyoty! Your AWS Certified AI Practitioner digital badge is now active on Credly...",
      body: [
        "Congratulations Divya Jyoty!",
        "You have officially earned the AWS Certified AI Practitioner certification, demonstrating verified competence in Machine Learning algorithms, Foundation Models, Generative AI applications, and AWS SageMaker cloud architecture.",
        "Your verifiable digital badge is now published on Credly and linked to your professional record.",
        "Together with your AWS Certified Cloud Practitioner credential, this validates your comprehensive capabilities in cloud computing and modern artificial intelligence.",
        "Best regards,",
        "Amazon Web Services Certification Team",
      ],
      date: "Sep 22",
      time: "4:00 PM",
      isUnread: false,
      isStarred: false,
      folder: "inbox",
      tag: "Certification",
      tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "email-5",
      sender: "Divya Jyoty",
      email: myEmail,
      avatarColor: "bg-indigo-600",
      subject: "🚀 Project Update: Collective Intelligence v1.2 Released",
      preview: "Hi everyone, I have published the simulation results and Matplotlib plots for 1,000 non-stationary rounds...",
      body: [
        "Hi team,",
        "I have updated the Collective-Intelligence repository with the final simulation data and plots (performance.png and trust.png).",
        "Key milestone: Collaborative Humans + AI maintained 32.8 average reward across sudden payoff phase shifts, proving group resilience against deceptive AI errors.",
        "The project is now live with interactive inspection in the macOS portfolio VS Code app.",
        "Best,",
        "Divya Jyoty",
      ],
      date: "Sep 18",
      time: "2:20 PM",
      isUnread: false,
      isStarred: false,
      folder: "sent",
      tag: "Update",
      tagColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    },
  ])

  // Filter emails based on folder and search query
  const filteredEmails = emails.filter((email) => {
    // Folder filter
    if (activeFolder === "starred" && !email.isStarred) return false
    if (activeFolder !== "starred" && email.folder !== activeFolder) return false

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchSender = email.sender.toLowerCase().includes(q)
      const matchSubject = email.subject.toLowerCase().includes(q)
      const matchPreview = email.preview.toLowerCase().includes(q)
      return matchSender || matchSubject || matchPreview
    }
    return true
  })

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || filteredEmails[0] || null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isStarred: !item.isStarred } : item))
    )
  }

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault()
    if (!composeSubject.trim() || !composeMessage.trim()) return

    setIsSending(true)

    setTimeout(() => {
      const newSentEmail: EmailItem = {
        id: `email-${Date.now()}`,
        sender: composeFrom || "You (Visitor)",
        email: composeFrom || "visitor@portfolio.dev",
        avatarColor: "bg-blue-600",
        subject: composeSubject,
        preview: composeMessage.slice(0, 80) + "...",
        body: [
          `To: Divya Jyoty <${myEmail}>`,
          `From: ${composeFrom || "Visitor"}`,
          "",
          composeMessage,
          "",
          "— Sent via Divya Jyoty macOS Portfolio Mail App",
        ],
        date: "Today",
        time: "Just now",
        isUnread: false,
        isStarred: false,
        folder: "sent",
        tag: "Inquiry",
        tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      }

      setEmails((prev) => [newSentEmail, ...prev])
      setIsSending(false)
      setSentSuccess(true)
      setComposeSubject("")
      setComposeMessage("")
      setComposeFrom("")

      setTimeout(() => {
        setSentSuccess(false)
        setIsComposing(false)
        setActiveFolder("sent")
        setSelectedEmailId(newSentEmail.id)
      }, 1200)
    }, 600)
  }

  const openNativeMailto = () => {
    const mailto = `mailto:${myEmail}?subject=${encodeURIComponent(
      composeSubject || "Connecting regarding AI & Engineering Opportunities"
    )}&body=${encodeURIComponent(composeMessage || "Hi Divya,\n\nI reviewed your portfolio and would like to connect...")}`
    window.location.href = mailto
  }

  // Theme Classes
  const bgMain = isDarkMode ? "bg-[#18181b]" : "bg-[#f4f4f5]"
  const sidebarBg = isDarkMode ? "bg-[#121214] border-[#27272a]" : "bg-[#f0f0f2] border-[#e4e4e7]"
  const listBg = isDarkMode ? "bg-[#18181b] border-[#27272a]" : "bg-[#ffffff] border-[#e4e4e7]"
  const detailBg = isDarkMode ? "bg-[#121214]" : "bg-[#ffffff]"
  const toolbarBg = isDarkMode ? "bg-[#1c1c1f] border-[#27272a]" : "bg-[#f8f8f9] border-[#e4e4e7]"
  const textPrimary = isDarkMode ? "text-gray-100" : "text-gray-900"
  const textSecondary = isDarkMode ? "text-gray-400" : "text-gray-600"
  const textMuted = isDarkMode ? "text-gray-500" : "text-gray-400"
  const borderCol = isDarkMode ? "border-[#27272a]" : "border-[#e4e4e7]"
  const inputBg = isDarkMode ? "bg-[#27272a] text-white border-[#3f3f46]" : "bg-[#ffffff] text-gray-900 border-[#d4d4d8]"
  const activeListBg = isDarkMode ? "bg-[#27272a] text-white border-l-2 border-[#007acc]" : "bg-[#e8f2ff] text-gray-900 border-l-2 border-[#007acc]"

  return (
    <div className={`h-full w-full ${bgMain} ${textPrimary} flex flex-col overflow-hidden select-none font-sans text-xs`}>
      {/* Top macOS Mail Toolbar */}
      <div className={`h-11 ${toolbarBg} border-b ${borderCol} px-3 flex items-center justify-between shrink-0`}>
        {/* Left Toolbar Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsComposing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#007acc] hover:bg-[#0098ff] active:scale-95 text-white font-semibold transition-all shadow-xs cursor-pointer"
            title="Compose New Message to Divya"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Compose</span>
          </button>

          <button
            onClick={() => {
              setIsComposing(false)
              setActiveFolder("inbox")
            }}
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400 hover:text-white transition-colors`}
            title="Inbox"
          >
            <Inbox className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (selectedEmail) {
                setEmails((prev) =>
                  prev.map((e) => (e.id === selectedEmail.id ? { ...e, folder: "trash" } : e))
                )
              }
            }}
            className={`p-1.5 rounded-md ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} text-gray-400 hover:text-red-400 transition-colors`}
            title="Move to Trash"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center Search Input */}
        <div className="flex-1 max-w-sm mx-4">
          <div className={`flex items-center px-2.5 py-1 rounded-lg border ${borderCol} ${inputBg}`}>
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* Right Info: Direct Email Copy */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/10 dark:bg-white/5 border border-gray-500/20 text-[11px] font-mono">
            <span>{myEmail}</span>
            <button
              onClick={handleCopyEmail}
              className="hover:text-blue-400 transition-colors cursor-pointer"
              title="Copy Divya's Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={`mailto:${myEmail}`}
            className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-gray-400 hover:text-blue-400 transition-colors"
            title="Open in System Mail App"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main 3-Column macOS Mail Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLUMN 1: MAILBOXES SIDEBAR (Hidden on mobile, visible on desktop/tablet) */}
        <div className={`hidden md:flex w-44 lg:w-48 ${sidebarBg} border-r ${borderCol} flex-col shrink-0 p-2 space-y-1`}>
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Mailboxes
          </div>

          <button
            onClick={() => {
              setActiveFolder("inbox")
              setIsComposing(false)
              setMobileView("list")
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeFolder === "inbox" && !isComposing
                ? "bg-[#007acc] text-white"
                : isDarkMode
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <Inbox className="w-3.5 h-3.5" />
              <span>Inbox</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-white font-mono">
              {emails.filter((e) => e.folder === "inbox" && e.isUnread).length || 4}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveFolder("starred")
              setIsComposing(false)
              setMobileView("list")
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeFolder === "starred" && !isComposing
                ? "bg-[#007acc] text-white"
                : isDarkMode
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
              <span>Flagged</span>
            </div>
            <span className="text-[10px] opacity-70">
              {emails.filter((e) => e.isStarred).length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveFolder("sent")
              setIsComposing(false)
              setMobileView("list")
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeFolder === "sent" && !isComposing
                ? "bg-[#007acc] text-white"
                : isDarkMode
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <Send className="w-3.5 h-3.5" />
              <span>Sent</span>
            </div>
            <span className="text-[10px] opacity-70">
              {emails.filter((e) => e.folder === "sent").length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveFolder("trash")
              setIsComposing(false)
              setMobileView("list")
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeFolder === "trash" && !isComposing
                ? "bg-[#007acc] text-white"
                : isDarkMode
                  ? "text-gray-300 hover:bg-white/5"
                  : "text-gray-700 hover:bg-black/5"
            }`}
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Trash</span>
            </div>
          </button>

          {/* Quick Contact Info Card in Sidebar Bottom */}
          <div className="mt-auto p-2.5 rounded-xl bg-black/10 dark:bg-white/5 border border-gray-500/15 space-y-2">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Direct Contact</span>
            <div className="space-y-1 text-[11px] leading-tight text-gray-300">
              <p className="font-semibold text-white">Divya Jyoty</p>
              <p className="text-[10px] opacity-75">{myPhone}</p>
              <p className="text-[10px] opacity-75">VIT-AP University</p>
            </div>
            <button
              onClick={() => setIsComposing(true)}
              className="w-full py-1 rounded bg-[#007acc]/20 hover:bg-[#007acc]/30 text-[#007acc] font-semibold text-[10px] transition-colors"
            >
              Write Message
            </button>
          </div>
        </div>

        {/* COLUMN 2: MESSAGE LIST COLUMN */}
        <div
          className={`w-full md:w-72 lg:w-80 ${listBg} border-r ${borderCol} flex-col shrink-0 overflow-y-auto ${
            mobileView === "detail" && !isComposing ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Mobile Folder Selector Pills */}
          <div className="md:hidden flex items-center gap-1.5 p-2 overflow-x-auto no-scrollbar border-b border-gray-500/15">
            <button
              onClick={() => setActiveFolder("inbox")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                activeFolder === "inbox" ? "bg-[#007acc] text-white" : "bg-black/10 dark:bg-white/5"
              }`}
            >
              Inbox ({emails.filter((e) => e.folder === "inbox").length})
            </button>
            <button
              onClick={() => setActiveFolder("starred")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                activeFolder === "starred" ? "bg-[#007acc] text-white" : "bg-black/10 dark:bg-white/5"
              }`}
            >
              Flagged ({emails.filter((e) => e.isStarred).length})
            </button>
            <button
              onClick={() => setActiveFolder("sent")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                activeFolder === "sent" ? "bg-[#007acc] text-white" : "bg-black/10 dark:bg-white/5"
              }`}
            >
              Sent ({emails.filter((e) => e.folder === "sent").length})
            </button>
            <button
              onClick={() => setActiveFolder("trash")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                activeFolder === "trash" ? "bg-[#007acc] text-white" : "bg-black/10 dark:bg-white/5"
              }`}
            >
              Trash
            </button>
          </div>

          <div className="p-2.5 border-b border-gray-500/15 flex items-center justify-between">
            <span className="font-bold text-xs capitalize">
              {activeFolder} ({filteredEmails.length})
            </span>
            <span className="text-[10px] text-gray-400">Sort by Date</span>
          </div>

          <div className="divide-y divide-gray-500/10">
            {filteredEmails.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-xs">
                No messages in {activeFolder}
              </div>
            ) : (
              filteredEmails.map((email) => {
                const isSelected = selectedEmailId === email.id && !isComposing
                return (
                  <div
                    key={email.id}
                    onClick={() => {
                      setSelectedEmailId(email.id)
                      setIsComposing(false)
                      setMobileView("detail")
                      setEmails((prev) =>
                        prev.map((e) => (e.id === email.id ? { ...e, isUnread: false } : e))
                      )
                    }}
                    className={`p-3 cursor-pointer transition-colors relative flex flex-col gap-1 ${
                      isSelected
                        ? activeListBg
                        : isDarkMode
                          ? "hover:bg-white/5"
                          : "hover:bg-black/5"
                    }`}
                  >
                    {/* Unread blue dot */}
                    {email.isUnread && (
                      <span className="absolute top-3.5 right-3 w-2 h-2 rounded-full bg-blue-500"></span>
                    )}

                    <div className="flex items-center justify-between pr-4">
                      <div className="flex items-center gap-1.5 truncate">
                        <button
                          onClick={(e) => toggleStar(email.id, e)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-3.5 h-3.5 ${
                              email.isStarred
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-400 hover:text-amber-400"
                            }`}
                          />
                        </button>
                        <span className={`font-semibold truncate text-xs ${email.isUnread ? "text-white font-bold" : ""}`}>
                          {email.sender}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">{email.date}</span>
                    </div>

                    <div className="font-medium text-xs truncate opacity-90">{email.subject}</div>

                    <p className={`text-[11px] line-clamp-2 ${textSecondary} leading-relaxed`}>
                      {email.preview}
                    </p>

                    {email.tag && (
                      <div className="mt-1">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium border ${email.tagColor || "bg-gray-500/20"}`}
                        >
                          {email.tag}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* COLUMN 3: READING & COMPOSE PANE (FILLS REMAINING SPACE 100%) */}
        <div
          className={`flex-1 ${detailBg} flex-col overflow-hidden ${
            mobileView === "list" && !isComposing ? "hidden md:flex" : "flex"
          }`}
        >
          {isComposing ? (
            /* ========================================================= */
            /* APPLE MAIL COMPOSE PANE                                   */
            /* ========================================================= */
            <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto">
              <div className="max-w-2xl w-full mx-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-500/20">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-sm sm:text-base">New Message to Divya Jyoty</h3>
                  </div>
                  <button
                    onClick={() => {
                      setIsComposing(false)
                      setMobileView("list")
                    }}
                    className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded bg-black/10 dark:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>

                {sentSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-bold text-xs">Message Sent Successfully!</p>
                      <p className="text-[11px] opacity-80">Saved to Sent Mailbox. Divya will get back to you shortly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendCompose} className="space-y-3.5">
                  {/* To Field (Pre-filled to Divya) */}
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-500/20 bg-black/5 dark:bg-white/5 text-xs">
                    <span className="text-gray-400 font-semibold w-12 shrink-0">To:</span>
                    <span className="font-mono text-blue-400 font-medium">Divya Jyoty &lt;{myEmail}&gt;</span>
                  </div>

                  {/* From Field */}
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-500/20 bg-black/5 dark:bg-white/5 text-xs">
                    <span className="text-gray-400 font-semibold w-12 shrink-0">From:</span>
                    <input
                      type="text"
                      placeholder="Your Name / Email (e.g. Recruiter, Collaborator, Hiring Manager)"
                      value={composeFrom}
                      onChange={(e) => setComposeFrom(e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-xs"
                      required
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="flex items-center gap-2 p-2 rounded-lg border border-gray-500/20 bg-black/5 dark:bg-white/5 text-xs">
                    <span className="text-gray-400 font-semibold w-12 shrink-0">Subject:</span>
                    <input
                      type="text"
                      placeholder="e.g. AI Engineering Opportunity / Project Discussion"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-xs"
                      required
                    />
                  </div>

                  {/* Message Body Field */}
                  <div>
                    <textarea
                      rows={9}
                      placeholder="Hi Divya,&#10;&#10;I came across your portfolio and was impressed by your GPU Benchmarking and Collective Intelligence projects. I'd love to connect regarding..."
                      value={composeMessage}
                      onChange={(e) => setComposeMessage(e.target.value)}
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs leading-relaxed resize-none ${inputBg}`}
                      required
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={openNativeMailto}
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in External Mail Client</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className={`w-3.5 h-3.5 ${isSending ? "animate-spin" : ""}`} />
                      <span>{isSending ? "Sending..." : "Send Message"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : selectedEmail ? (
            /* ========================================================= */
            /* READING PANE (FULL EMAIL DETAILS)                         */
            /* ========================================================= */
            <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 select-text">
              <div className="max-w-3xl w-full mx-auto space-y-4">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-[#007acc] hover:text-white transition-colors text-xs font-semibold cursor-pointer w-fit"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>All Messages</span>
                </button>

                {/* Email Header */}
                <div className="pb-4 border-b border-gray-500/20 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-base sm:text-lg font-bold leading-snug">
                      {selectedEmail.subject}
                    </h2>
                    <button
                      onClick={(e) => toggleStar(selectedEmail.id, e)}
                      className="hover:scale-110 transition-transform p-1"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          selectedEmail.isStarred
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-400 hover:text-amber-400"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${selectedEmail.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow`}>
                        {selectedEmail.sender[0]}
                      </div>
                      <div>
                        <p className="font-bold">{selectedEmail.sender}</p>
                        <p className="text-[11px] text-gray-400 font-mono">{selectedEmail.email}</p>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-gray-400">
                      <p>{selectedEmail.date}</p>
                      <p>{selectedEmail.time}</p>
                    </div>
                  </div>
                </div>

                {/* Email Message Content */}
                <div className={`text-xs sm:text-[13px] leading-relaxed space-y-3.5 py-2 ${textPrimary}`}>
                  {selectedEmail.body.map((line, idx) => (
                    <p key={idx} className={line.startsWith("—") ? "text-gray-400 italic font-mono text-xs" : ""}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* Quick Action Footer */}
                <div className="pt-6 border-t border-gray-500/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsComposing(true)
                        setComposeSubject(`Re: ${selectedEmail.subject}`)
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/10 font-medium text-xs transition-colors cursor-pointer"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsComposing(true)
                        setComposeSubject(`Fwd: ${selectedEmail.subject}`)
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/10 font-medium text-xs transition-colors cursor-pointer"
                    >
                      <Forward className="w-3.5 h-3.5" />
                      <span>Forward</span>
                    </button>
                  </div>

                  <a
                    href={`mailto:${myEmail}?subject=Regarding ${encodeURIComponent(selectedEmail.subject)}`}
                    className="flex items-center gap-1 text-xs text-blue-400 hover:underline"
                  >
                    <span>Send external email to Divya</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
              <Mail className="w-12 h-12 mb-2 opacity-40" />
              <p>No message selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
