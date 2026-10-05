"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

interface NotesProps {
  isDarkMode?: boolean
}

export default function Notes({ isDarkMode = true }: NotesProps) {
  const [mobileView, setMobileView] = useState<"list" | "detail">("list")
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "About Me",
      content: `# Divya Jyoty
AI Engineer & Full Stack Developer
Amaravati, Andhra Pradesh, India

## Summary
Passionate AI Engineer and Computer Science undergraduate at VIT-AP University with a CGPA of 9.39/10. Experienced in deep learning model optimization, custom CUDA kernel development, and building scalable full-stack AI applications with modern frameworks.

## Education
VIT-AP University, Amaravati, Andhra Pradesh (2023 – 2027)
- B.Tech in Computer Science and Engineering
- CGPA: 9.39 / 10 | Expected Graduation: May 2027
- Relevant Coursework: Data Structures & Algorithms, Artificial Intelligence, Machine Learning, Operating Systems, DBMS, Computer Networks, Computer Organization & Architecture, Statistics.

## Awards & Achievements
- 🥇 1st Place — Artificial Intelligence and Machine Learning Hackathon 2025, IIT-Hyderabad
- 🥇 1st Place — Generative AI Hackathon 2025, IIT-Hyderabad
- 🥉 3rd Place — Mole and the Byte Hackathon held by ACS Chapter

## Contact
- Email: jyotydivya844@gmail.com
- Phone: +91 9386179234
- LinkedIn: linkedin.com/in/divya-jyoty
- GitHub: github.com/jyotydivya`,
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      title: "Featured Projects",
      content: `# Featured Projects

## 1. GPU Inference Benchmarking
Jul 2026 – Aug 2026 | PyTorch · CUDA · FastAPI · TensorRT · Python · Streamlit
GitHub: https://github.com/jyotydivya
• Architected a deep learning benchmarking system evaluating model execution across 3 inference configurations: CPU, PyTorch CUDA, and TensorRT.
• Designed and optimized custom CUDA preprocessing kernels, decreasing memory bottlenecks and accelerating real-time inference throughput by 35% through rigorous testing.
• Optimized GPU hardware utilization by 18% via cuDNN profiling, presenting performance telemetry and visualization through a real-time Streamlit dashboard.

---

## 2. Selective Intelligence
Oct 2025 – Nov 2025 | Python · PyTorch · Streamlit Learning · NumPy
GitHub: https://github.com/jyotydivya
• Built a custom Reinforcement Learning environment with 1,152 discrete states to optimize 4 educational intervention strategies across student proficiency profiles.
• Implemented and benchmarked Tabular Q-Learning and Deep Q-Networks (DQN) using PyTorch, a 5,000-capacity experience replay buffer, and ε-greedy/Softmax exploration across 4,000+ simulation episodes.
• Constructed a real-time Streamlit dashboard to visualize cognitive states, model decisions, and action distributions, enhancing analytic clarity by 25%.

---

## 3. SkillSwap Hub
Aug 2025 – Sep 2025 | React.js · Node.js · Express.js · MongoDB · Socket.IO · Razorpay · JWT
GitHub: https://github.com/jyotydivya
• Initiated a full-stack development project using React.js, Node.js, and MongoDB, translating business requirements into a 7-collection database schema with reporting queries that enhanced skill discovery and secure user exchanges.
• Designed a real-time messaging solution using JavaScript and WebSockets, implementing persistent chat history and live typing indicators, reducing message latency by 50%.
• Integrated Razorpay payment processing with server-side HMAC-SHA256 signature verification, JWT authentication, premium subscriptions, and payment audit tracking.`,
      date: "Today, 9:15 AM",
    },
    {
      id: 3,
      title: "Work Experience",
      content: `# Work Experience & Leadership

## AI Engineer Intern
IBM–Adroit Technologies — Remote, Bengaluru, Karnataka
May 2026 – July 2026
• Forged personalized learning roadmaps by employing Python, Flask, and Google Gemini API, driving end-to-end API development and boosting user engagement by 30% within the generator's initial deployment.
• Designed a 3-tier AI application architecture spanning frontend, Flask backend, and Gemini-based AI processing, driving API development by building 2 RESTful Flask endpoints as Web Services for user interaction and learning-path generation.
• Formulated and tested advanced prompt templates for enterprise software automation of the learning-path business process, improving AI output relevance and consistency by 40% through iterative response refinement.

---

## Leadership Roles
• Former Vice President, IETE Chapter, VIT-AP
  - Documented 6+ club initiatives serving 100+ active members, standardizing volunteer onboarding.
• Former Joint Secretary, IETE Chapter, VIT-AP
  - Judged 40+ projects across technical and design tracks.`,
      date: "Yesterday, 4:20 PM",
    },
    {
      id: 4,
      title: "Technical Skills",
      content: `# Technical Skills & Certifications

## Programming Languages
• Python, Java, JavaScript, TypeScript, C, C++, SQL, MATLAB

## Machine Learning & AI
• Deep Learning, Reinforcement Learning, PyTorch, Scikit-learn, CUDA, TensorRT, NumPy, Pandas, Prompt Engineering

## Web & Backend Development
• React.js, Node.js, Express.js, Flask, Spring Boot, Socket.IO, WebSockets, RESTful APIs, SOAP Web Services, Microservices, JWT

## Databases & Cloud
• MongoDB, Mongoose, MySQL, Cloud architecture

## Systems & Infrastructure
• Linux, Bash/Shell Scripting, Docker, Kubernetes, Apache

## Developer Tools & DevOps
• Git, GitHub Actions, CI/CD, pytest, integration testing, code review, debugging, GitHub Copilot

## Certifications
• AWS Academy Cloud Foundations
• AWS Academy Cloud Architecture (2025)`,
      date: "Yesterday, 2:00 PM",
    },
  ])

  const [selectedNoteId, setSelectedNoteId] = useState(1)
  const [editableContent, setEditableContent] = useState(notes[0].content)

  const selectedNote = notes.find((note) => note.id === selectedNoteId)

  const handleNoteSelect = (id: number) => {
    setSelectedNoteId(id)
    const note = notes.find((n) => n.id === id)
    if (note) {
      setEditableContent(note.content)
    }
    setMobileView("detail")
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value)

    setNotes(
      notes.map((note) => {
        if (note.id === selectedNoteId) {
          return { ...note, content: e.target.value }
        }
        return note
      }),
    )
  }

  const textColor = isDarkMode ? "text-white" : "text-gray-800"
  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white"
  const sidebarBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
  const hoverBg = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
  const selectedBg = isDarkMode ? "bg-gray-700" : "bg-gray-300"

  return (
    <div className={`flex h-full ${bgColor} ${textColor} select-text overflow-hidden`}>
      {/* Sidebar */}
      <div
        className={`w-full sm:w-64 ${sidebarBg} border-r ${borderColor} flex-col shrink-0 ${
          mobileView === "detail" ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="p-3 border-b border-gray-700/40 flex justify-between items-center">
          <h2 className="font-semibold text-sm">Notes</h2>
          <span className="text-xs text-gray-400">{notes.length} Notes</span>
        </div>
        <div className="overflow-y-auto flex-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 cursor-pointer border-b border-gray-700/20 transition-colors ${
                selectedNoteId === note.id ? selectedBg : hoverBg
              }`}
              onClick={() => handleNoteSelect(note.id)}
            >
              <h3 className="font-medium text-sm truncate">{note.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{note.date}</p>
              <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {note.content.split("\n")[0].replace(/^#+ /, "")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note content */}
      <div
        className={`flex-1 flex-col overflow-hidden ${
          mobileView === "list" ? "hidden sm:flex" : "flex"
        }`}
      >
        {selectedNote && (
          <>
            <div className={`p-3 border-b ${borderColor} flex justify-between items-center shrink-0`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileView("list")}
                  className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded bg-black/10 dark:bg-white/10 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>
                <div>
                  <h2 className="font-semibold text-sm truncate max-w-[180px] sm:max-w-none">{selectedNote.title}</h2>
                  <p className="text-xs text-gray-500">{selectedNote.date}</p>
                </div>
              </div>
              <span className="text-[11px] text-gray-400 px-2 py-0.5 rounded bg-gray-500/10">Editable</span>
            </div>
            <div className="flex-1 p-3 sm:p-5 overflow-auto">
              <textarea
                className={`w-full h-full resize-none font-mono text-xs sm:text-sm leading-relaxed ${bgColor} ${textColor} focus:outline-none`}
                value={editableContent}
                onChange={handleContentChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
