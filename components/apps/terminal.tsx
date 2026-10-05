"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TerminalProps {
  isDarkMode?: boolean
}

export default function Terminal({ isDarkMode = true }: TerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const bgColor = "bg-black"
  const textColor = "text-green-400"

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus()
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)

      setHistory([
        "Last login: " + new Date().toLocaleString(),
        "Welcome to macOS Terminal — Divya Jyoty's Portfolio Shell",
        "Type 'help' to see available commands or 'projects' / 'about' to explore.",
        "",
      ])
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
      setCommandHistory((prev) => [...prev, input])
      setHistoryIndex(-1)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      navigateHistory(-1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      navigateHistory(1)
    }
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.length === 0) return

    const newIndex = historyIndex + direction

    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1)
      setInput("")
    } else if (newIndex >= 0) {
      setHistoryIndex(newIndex)
      setInput(commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const args = command.split(" ")
    const mainCommand = args[0]

    setHistory((prev) => [...prev, `divya@macbook-pro ~ $ ${cmd}`, ""])

    switch (mainCommand) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  about       - Overview of Divya Jyoty & background",
          "  projects    - Show featured AI/ML & Full Stack projects",
          "  skills      - List programming languages, ML & web tools",
          "  experience  - Show internship & leadership experience",
          "  education   - University, degree, and GPA",
          "  awards      - Hackathon wins & achievements",
          "  contact     - Email, GitHub, LinkedIn, phone",
          "  resume      - Link to download & view PDF resume",
          "  whoami      - Print current user",
          "  ls          - List directory contents",
          "  date        - Current timestamp",
          "  echo [text] - Print text",
          "  clear       - Clear screen",
          "",
        ])
        break

      case "clear":
        setHistory([""])
        break

      case "echo":
        const echoText = args.slice(1).join(" ")
        setHistory((prev) => [...prev, echoText, ""])
        break

      case "date":
        setHistory((prev) => [...prev, new Date().toString(), ""])
        break

      case "ls":
        setHistory((prev) => [
          ...prev,
          "GPU-Inference-Benchmarking/   Selective-Intelligence/   SkillSwap-Hub/",
          "Divya_Jyoty_Resume.pdf        Documents/                Projects/",
          "",
        ])
        break

      case "whoami":
        setHistory((prev) => [...prev, "divya (Divya Jyoty — AI Engineer & Full Stack Developer)", ""])
        break

      case "about":
        setHistory((prev) => [
          ...prev,
          "┌────────────────────────────────────────────────────────┐",
          "│ Divya Jyoty                                            │",
          "│ AI Engineer & Full Stack Developer                     │",
          "│ B.Tech CSE @ VIT-AP (CGPA: 9.39/10)                    │",
          "└────────────────────────────────────────────────────────┘",
          "",
          "I am a passionate AI Engineer and software developer focusing on",
          "deep learning performance optimization, custom CUDA acceleration,",
          "and scalable full-stack applications. Double 1st place winner at",
          "national AI hackathons held by IIT-Hyderabad.",
          "",
          "Type 'projects' or 'skills' for more technical details.",
          "",
        ])
        break

      case "projects":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│   Featured Projects     │",
          "└─────────────────────────┘",
          "",
          "1. GPU Inference Benchmarking [Jul 2026 – Aug 2026]",
          "   Stack: PyTorch, CUDA, FastAPI, TensorRT, Python, Streamlit",
          "   • Evaluated DL model execution across CPU, PyTorch CUDA, and TensorRT.",
          "   • Built custom CUDA preprocessing kernels, boosting throughput by 35%.",
          "   • Profiled via cuDNN to increase GPU utilization by 18% with Streamlit.",
          "   • GitHub: https://github.com/jyotydivya",
          "",
          "2. Selective Intelligence [Oct 2025 – Nov 2025]",
          "   Stack: Python, PyTorch, Reinforcement Learning, NumPy, Streamlit",
          "   • Built custom RL environment with 1,152 discrete states for education.",
          "   • Implemented Tabular Q-Learning and DQN with 5,000 replay buffer.",
          "   • Benchmark telemetry dashboard in Streamlit (+25% analytic clarity).",
          "   • GitHub: https://github.com/jyotydivya",
          "",
          "3. SkillSwap Hub [Aug 2025 – Sep 2025]",
          "   Stack: React.js, Node.js, Express.js, MongoDB, Socket.IO, Razorpay, JWT",
          "   • Full-stack skill exchange with 7-collection DB schema and reporting.",
          "   • Real-time WebSockets chat with persistent history & live typing.",
          "   • Integrated Razorpay HMAC-SHA256 signature verification and JWT auth.",
          "   • GitHub: https://github.com/jyotydivya",
          "",
        ])
        break

      case "skills":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│    Technical Skills     │",
          "└─────────────────────────┘",
          "",
          "Languages:         Python, Java, JavaScript, TypeScript, C, C++, SQL, MATLAB",
          "Machine Learning:  Deep Learning, Reinforcement Learning, PyTorch, Scikit-learn,",
          "                   CUDA, TensorRT, NumPy, Pandas, Prompt Engineering",
          "Web & Backend:     React.js, Node.js, Express.js, Flask, Spring Boot, Socket.IO,",
          "                   WebSockets, JWT, RESTful APIs, SOAP Web Services",
          "Databases & Cloud: MongoDB, Mongoose, MySQL, AWS",
          "Infrastructure:    Linux, Bash/Shell, Docker, Kubernetes, Microservices",
          "Developer Tools:   Git, GitHub Actions, CI/CD, pytest, debugging, Copilot",
          "Certifications:    AWS Academy Cloud Foundations, AWS Academy Cloud Architecture",
          "",
        ])
        break

      case "experience":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│     Work Experience     │",
          "└─────────────────────────┘",
          "",
          "• AI Engineer Intern @ IBM–Adroit Technologies (Remote, Bengaluru)",
          "  [May 2026 – July 2026]",
          "  - Engineered personalized learning path generator using Flask and Google Gemini API.",
          "  - Built 3-tier architecture with RESTful endpoints, boosting engagement by 30%.",
          "  - Formulated advanced prompt templates, refining response consistency by 40%.",
          "",
          "• Leadership Roles @ IETE Chapter, VIT-AP:",
          "  - Former Vice President: Led 6+ club initiatives, 100+ active members.",
          "  - Former Joint Secretary: Judged 40+ technical and design projects.",
          "",
        ])
        break

      case "education":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│        Education        │",
          "└─────────────────────────┘",
          "",
          "VIT-AP University, Amaravati, Andhra Pradesh (2023 – 2027)",
          "B.Tech in Computer Science and Engineering",
          "CGPA: 9.39 / 10 | Expected Graduation: May 2027",
          "",
          "Coursework: DSA, AI, ML, OS, DBMS, Networks, Computer Architecture, Statistics",
          "",
        ])
        break

      case "awards":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│    Awards & Honors      │",
          "└─────────────────────────┘",
          "",
          "🏆 1st Place: Artificial Intelligence & Machine Learning Hackathon 2025, IIT-Hyderabad",
          "🏆 1st Place: Generative AI Hackathon 2025, IIT-Hyderabad",
          "🥉 3rd Place: Mole and the Byte Hackathon held by ACS Chapter",
          "",
        ])
        break

      case "contact":
        setHistory((prev) => [
          ...prev,
          "┌─────────────────────────┐",
          "│   Contact Information   │",
          "└─────────────────────────┘",
          "",
          "Name:     Divya Jyoty",
          "Email:    jyotydivya844@gmail.com",
          "Phone:    +91 9386179234",
          "GitHub:   https://github.com/jyotydivya",
          "LinkedIn: https://linkedin.com/in/divya-jyoty",
          "",
        ])
        break

      case "resume":
        setHistory((prev) => [
          ...prev,
          "Resume PDF available at: /Divya_Jyoty_Resume.pdf",
          "Opening resume in browser...",
          "",
        ])
        if (typeof window !== "undefined") {
          window.open("/Divya_Jyoty_Resume.pdf", "_blank")
        }
        break

      default:
        setHistory((prev) => [
          ...prev,
          `zsh: command not found: ${mainCommand}`,
          "Type 'help' to see all available commands.",
          "",
        ])
    }
  }

  return (
    <div ref={terminalRef} className={`h-full ${bgColor} ${textColor} p-4 font-mono text-sm overflow-auto`}>
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap leading-relaxed">
          {line}
        </div>
      ))}

      <div className="flex items-center">
        <span className="mr-2 text-cyan-400 font-semibold">divya@macbook-pro ~ $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none caret-green-400 text-green-400 font-mono"
          autoFocus
        />
      </div>
    </div>
  )
}
