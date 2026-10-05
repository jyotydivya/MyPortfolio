"use client"

import { useState } from "react"
import {
  Github,
  ExternalLink,
  BookOpen,
  Award,
  Search,
  Globe,
} from "lucide-react"

interface GitHubProps {
  isDarkMode?: boolean
}

export default function GitHub({ isDarkMode = true }: GitHubProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "aiml" | "fullstack" | "systems">("all")

  // GitHub Theme Colors for Day & Night
  const textColor = isDarkMode ? "text-white" : "text-[#1f2328]"
  const subtextColor = isDarkMode ? "text-gray-300" : "text-[#4b5563]"
  const mutedTextColor = isDarkMode ? "text-gray-400" : "text-[#656d76]"
  const bgColor = isDarkMode ? "bg-[#0d1117]" : "bg-[#f6f8fa]"
  const cardBg = isDarkMode ? "bg-[#161b22] border-[#30363d]" : "bg-white border-[#d0d7de] shadow-sm"
  const cardHoverBorder = isDarkMode ? "hover:border-gray-500" : "hover:border-[#0969da]"
  const badgeStyle = isDarkMode
    ? "bg-gray-800/80 border-gray-700/80 text-gray-300"
    : "bg-gray-100 border-gray-200 text-gray-700"
  const tabContainerBg = isDarkMode ? "bg-gray-800/60 border-gray-700/60" : "bg-gray-200/80 border-gray-300"
  const tabInactiveText = isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
  const inputBg = isDarkMode
    ? "bg-[#0d1117] border-[#30363d] text-white placeholder-gray-500"
    : "bg-white border-[#d0d7de] text-[#1f2328] placeholder-gray-400"
  const dividerColor = isDarkMode ? "border-gray-700/50" : "border-gray-200"
  const repoTitleColor = isDarkMode ? "text-blue-400 hover:underline" : "text-[#0969da] hover:underline"
  const viewCodeBtnStyle = isDarkMode
    ? "bg-gray-800 hover:bg-gray-700 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"

  const allProjects = [
    {
      name: "GPU-Accelerated-ML-Inference-Benchmark",
      displayName: "GPU-Accelerated ML Inference Benchmark",
      url: "https://github.com/jyotydivya/GPU-Accelerated-ML-Inference-Benchmark",
      desc: "Deep learning benchmarking system evaluating model execution across CPU, PyTorch CUDA, and TensorRT. Features custom CUDA preprocessing kernels (35% throughput acceleration) and cuDNN profiling (18% GPU utilization increase).",
      category: "aiml",
      lang: "Python / CUDA",
      color: "bg-[#3572A5]",
      tags: ["PyTorch", "CUDA", "TensorRT", "FastAPI", "Streamlit"],
      isPinned: true,
      demoUrl: null,
    },
    {
      name: "Collective-Intelligence",
      displayName: "Collective Intelligence",
      url: "https://github.com/jyotydivya/Collective-Intelligence",
      desc: "Multi-agent simulation exploring human-AI collaborative intelligence, emergent group decision-making, and dynamic trust modeling across heterogeneous agents in complex non-stationary environments.",
      category: "aiml",
      lang: "Python",
      color: "bg-[#3572A5]",
      tags: ["Multi-Agent", "AI Simulation", "Trust Modeling", "Python"],
      isPinned: true,
      demoUrl: null,
    },
    {
      name: "Selective-Intelligence",
      displayName: "Selective Intelligence",
      url: "https://github.com/jyotydivya/Selective-Intelligence",
      desc: "Custom Reinforcement Learning environment with 1,152 discrete states to optimize 4 educational intervention strategies. Benchmark Tabular Q-Learning and Deep Q-Networks (DQN) with Streamlit cognitive telemetry dashboard.",
      category: "aiml",
      lang: "Python",
      color: "bg-[#3572A5]",
      tags: ["Reinforcement Learning", "PyTorch", "DQN", "Q-Learning", "NumPy"],
      isPinned: true,
      demoUrl: null,
    },
    {
      name: "D-ASK",
      displayName: "D-ASK",
      url: "https://github.com/jyotydivya/D-ASK",
      desc: "Modern AI-driven Q&A and knowledge retrieval system built with TypeScript. Implements intuitive search, semantic knowledge processing, and high-performance interactive UI.",
      category: "aiml",
      lang: "TypeScript",
      color: "bg-[#3178c6]",
      tags: ["TypeScript", "Next.js", "AI Assistant", "Search"],
      isPinned: true,
      demoUrl: null,
    },
    {
      name: "Skill-Swap-Hub",
      displayName: "Skill Swap Hub",
      url: "https://github.com/jyotydivya/Skill-Swap-Hub",
      desc: "Full-stack collaborative skill marketplace with 7-collection database schema, persistent real-time WebSockets chat with live typing indicators (50% latency drop), and Razorpay HMAC-SHA256 signature payment verification.",
      category: "fullstack",
      lang: "JavaScript",
      color: "bg-[#f1e05a]",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Razorpay"],
      isPinned: true,
      demoUrl: "https://skill-swap-hub-indol.vercel.app",
    },
    {
      name: "Campus-EMS",
      displayName: "Campus EMS",
      url: "https://github.com/jyotydivya/Campus-EMS",
      desc: "Campus Event Management System streamlining university club events, participant registrations, real-time schedule tracking, and volunteer coordination with clean responsive UI.",
      category: "fullstack",
      lang: "JavaScript",
      color: "bg-[#f1e05a]",
      tags: ["React", "Node.js", "Event Management", "Vercel"],
      isPinned: false,
      demoUrl: "https://campus-ems.vercel.app",
    },
    {
      name: "ArchOpt",
      displayName: "ArchOpt",
      url: "https://github.com/jyotydivya/ArchOpt",
      desc: "Architectural optimization and systems performance framework for evaluating memory bottlenecks, latency profiling, and algorithmic efficiency in computational models.",
      category: "systems",
      lang: "Python",
      color: "bg-[#3572A5]",
      tags: ["Architecture Optimization", "Performance Profiling", "Systems"],
      isPinned: false,
      demoUrl: null,
    },
    {
      name: "HavenSense",
      displayName: "HavenSense",
      url: "https://github.com/jyotydivya/HavenSense",
      desc: "A Sentient Room for Non-Intrusive Emotional Intelligence. Utilizes smart sensors, C++ edge processing, and affective computing algorithms for adaptive environmental responses.",
      category: "systems",
      lang: "C++",
      color: "bg-[#f34b7d]",
      tags: ["C++", "Affective Computing", "Edge AI", "IoT"],
      isPinned: false,
      demoUrl: null,
    },
    {
      name: "LearnPath-AI",
      displayName: "LearnPath AI",
      url: "https://github.com/jyotydivya/LearnPath-AI",
      desc: "Personalized learning roadmap generator employing Python, Flask, and Google Gemini API with 3-tier architecture, building RESTful endpoints and prompt templates (from IBM–Adroit internship).",
      category: "fullstack",
      lang: "Python / HTML",
      color: "bg-[#e34c26]",
      tags: ["Gemini API", "Flask", "Python", "Prompt Engineering"],
      isPinned: false,
      demoUrl: null,
    },
    {
      name: "MoiPet",
      displayName: "MoiPet",
      url: "https://github.com/jyotydivya/MoiPet",
      desc: "Interactive virtual companion and pet care web application featuring gamified routines, dynamic mood states, responsive animations, and playful UI dynamics.",
      category: "fullstack",
      lang: "JavaScript",
      color: "bg-[#f1e05a]",
      tags: ["JavaScript", "Gamification", "Frontend"],
      isPinned: false,
      demoUrl: null,
    },
  ]

  const filteredProjects = allProjects.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      proj.name.toLowerCase().includes(query) ||
      proj.displayName.toLowerCase().includes(query) ||
      proj.desc.toLowerCase().includes(query) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      proj.lang.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  const handleOpenGitHub = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className={`h-full ${bgColor} ${textColor} p-4 sm:p-6 overflow-auto transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className={`p-6 rounded-2xl border ${cardBg} flex flex-col sm:flex-row items-center sm:items-start gap-5`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
            DJ
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                  <span>Divya Jyoty</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${isDarkMode ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-700 border border-purple-200"}`}>
                    Developer
                  </span>
                </h1>
                <p className={`text-sm font-mono ${mutedTextColor}`}>@jyotydivya</p>
              </div>
              <button
                onClick={() => handleOpenGitHub("https://github.com/jyotydivya")}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-medium transition-colors shadow"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className={`text-sm mt-3 leading-relaxed font-normal ${subtextColor}`}>
              AI Engineer & B.Tech CSE @ VIT-AP (CGPA 9.39) · 2x National AI Hackathon Winner (IIT Hyderabad) · Architecting deep learning inference optimization, CUDA acceleration, multi-agent collective intelligence, and full-stack AI applications.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2.5 mt-4 text-xs font-mono">
              <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${badgeStyle}`}>
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                <strong>10</strong> Public Repos
              </span>
              <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${badgeStyle}`}>
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                <strong>2</strong> Live Deployments
              </span>
              <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${badgeStyle}`}>
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <strong>2x</strong> 1st Place IIT-H Hackathons
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl border overflow-x-auto ${tabContainerBg}`}>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === "all" ? "bg-blue-600 text-white shadow" : tabInactiveText
              }`}
            >
              All Projects ({allProjects.length})
            </button>
            <button
              onClick={() => setSelectedCategory("aiml")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === "aiml" ? "bg-blue-600 text-white shadow" : tabInactiveText
              }`}
            >
              AI & ML (4)
            </button>
            <button
              onClick={() => setSelectedCategory("fullstack")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === "fullstack" ? "bg-blue-600 text-white shadow" : tabInactiveText
              }`}
            >
              Full Stack & Web (4)
            </button>
            <button
              onClick={() => setSelectedCategory("systems")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === "systems" ? "bg-blue-600 text-white shadow" : tabInactiveText
              }`}
            >
              Systems & IoT (2)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${mutedTextColor}`} />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-blue-500 ${inputBg}`}
            />
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border ${cardBg} ${cardHoverBorder} transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <BookOpen className={`w-4 h-4 ${mutedTextColor} shrink-0`} />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-semibold truncate ${repoTitleColor}`}
                      title={project.name}
                    >
                      {project.name}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {project.isPinned && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                        isDarkMode
                          ? "border-purple-500/30 text-purple-300 bg-purple-500/10"
                          : "border-purple-300 text-purple-700 bg-purple-50"
                      }`}>
                        Pinned
                      </span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      isDarkMode
                        ? "border-gray-700 text-gray-400 bg-gray-800/40"
                        : "border-gray-300 text-gray-600 bg-gray-50"
                    }`}>
                      Public
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${subtextColor}`}>
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] px-2 py-0.5 rounded border font-mono ${badgeStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className={`pt-3 border-t ${dividerColor} flex items-center justify-between text-xs mt-auto`}>
                <div className={`flex items-center gap-2 font-mono ${mutedTextColor}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${project.color}`}></span>
                  <span>{project.lang}</span>
                </div>

                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                        isDarkMode
                          ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                      title="Visit Live Deployment"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${viewCodeBtnStyle}`}
                  >
                    <span>View Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className={`text-center py-12 ${mutedTextColor}`}>
            <p>No repositories match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
