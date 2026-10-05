"use client"

import { useState } from "react"
import {
  Play,
  Terminal as TerminalIcon,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Folder,
  BarChart3,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  GitBranch,
  RefreshCw,
  Code2,
  ZoomIn,
  X,
  Layers,
  FileText,
  Table,
} from "lucide-react"

interface VSCodeProps {
  isDarkMode?: boolean
}

type TabType = "simulator.py" | "README.md" | "requirements.txt" | "simulation_results.csv" | "results"

export default function VSCode({ isDarkMode = true }: VSCodeProps) {
  const [activeTab, setActiveTab] = useState<TabType>("simulator.py")
  const [isFolderOpen, setIsFolderOpen] = useState(true)
  const [showTerminal, setShowTerminal] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [simulationCount, setSimulationCount] = useState(1)
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; title: string; subtitle: string } | null>(null)

  // Simulation Metrics matching the actual Collective-Intelligence Matplotlib plots
  const [metrics, setMetrics] = useState({
    humansOnly: 33.4,
    aiOnly: 13.0,
    humansAi: 32.8,
    entropy: 0.684,
    volatility: 0.012,
    minorityCorrect: "14.3%",
  })

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "divya@macbook-pro Collective-Intelligence % python simulator.py --rounds 1000",
    "Initializing multi-agent simulation environment...",
    "Agent Pool: Human [Safe, Balanced, Risky], AI [Rational EV Strategy]",
    "Executing 1,000 stochastic rounds with non-stationary phase transitions...",
    "",
    "===== PERFORMANCE COMPARISON =====",
    "Scenario             Avg Reward     ",
    "-----------------------------------",
    "Humans Only          33.40",
    "AI Only              13.00",
    "Humans + AI          32.80",
    "",
    "===== ADVANCED RESEARCH METRICS =====",
    "Average Decision Entropy: 0.684",
    "Trust Volatility: 0.012",
    "Minority Correctness Rate: 0.143",
    "",
    "✓ simulation_results.csv saved (1000 rounds logged)",
    "✓ Plots saved: performance.png, trust.png",
    "divya@macbook-pro Collective-Intelligence % ",
  ])

  const handleRunSimulation = () => {
    setIsRunning(true)
    // Instantly switch to the Final Simulations tab so the user sees the execution & plots
    setActiveTab("results")

    setTimeout(() => {
      const hReward = +(33.0 + Math.random() * 0.8).toFixed(2)
      const aReward = +(12.6 + Math.random() * 0.8).toFixed(2)
      const cReward = +(32.4 + Math.random() * 0.8).toFixed(2)
      const ent = +(0.67 + Math.random() * 0.03).toFixed(3)
      const vol = +(0.011 + Math.random() * 0.003).toFixed(3)

      setMetrics({
        humansOnly: hReward,
        aiOnly: aReward,
        humansAi: cReward,
        entropy: ent,
        volatility: vol,
        minorityCorrect: "14.8%",
      })

      setTerminalLogs((prev) => [
        ...prev,
        `divya@macbook-pro Collective-Intelligence % python simulator.py --rounds 1000 (Run #${simulationCount + 1})`,
        "Executing stochastic dynamic multi-agent decision model...",
        "Simulating Human Agents (Safe, Balanced, Risky) with Adaptive Trust...",
        "Evaluating rational vs peer-influenced convergence...",
        "",
        "===== FINAL SIMULATION PERFORMANCE COMPARISON =====",
        "Scenario             Avg Reward     ",
        "-----------------------------------",
        `Humans Only          ${hReward}`,
        `AI Only              ${aReward}`,
        `Humans + AI          ${cReward}`,
        "",
        "===== ADVANCED RESEARCH METRICS =====",
        `Average Decision Entropy: ${ent}`,
        `Trust Volatility: ${vol}`,
        "Minority Correctness Rate: 0.148",
        "",
        "✓ Final simulations generated: performance.png & trust.png updated",
        "divya@macbook-pro Collective-Intelligence % ",
      ])

      setSimulationCount((c) => c + 1)
      setIsRunning(false)
    }, 600)
  }

  // VS Code Themes & High-Contrast Colors
  const vsBg = isDarkMode ? "bg-[#1e1e1e]" : "bg-[#ffffff]"
  const sidebarBg = isDarkMode ? "bg-[#252526]" : "bg-[#f3f3f3]"
  const titlebarBg = isDarkMode ? "bg-[#323233]" : "bg-[#e8e8e8]"
  const activeTabBg = isDarkMode
    ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc] font-medium"
    : "bg-[#ffffff] text-[#0969da] border-t-2 border-t-[#0969da] font-semibold"
  const inactiveTabBg = isDarkMode
    ? "bg-[#2d2d2d] text-[#cccccc] hover:bg-[#282828] hover:text-white"
    : "bg-[#f3f3f3] text-[#4b5563] hover:bg-[#e5e5e5] hover:text-[#1f2328]"
  const borderCol = isDarkMode ? "border-[#3c3c3c]" : "border-[#d0d7de]"
  const cardBg = isDarkMode ? "bg-[#252526] border-[#3c3c3c]" : "bg-[#f8f9fa] border-[#d0d7de]"
  const codeDefaultText = isDarkMode ? "text-[#d4d4d4]" : "text-[#1f2328]"
  const codeFontFamily = {
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, Monaco, Consolas, 'Courier New', monospace",
  }

  // Python Code Content
  const simulatorPythonCode = `import random
import matplotlib.pyplot as plt
import csv
import math

# ==============================================================================
# COLLECTIVE INTELLIGENCE SIMULATOR
# Multi-Agent Simulation: Human-AI Collaborative Decision Dynamics
# Author: Divya Jyoty (https://github.com/jyotydivya/Collective-Intelligence)
# ==============================================================================

def calculate_entropy(choices):
    """Measures collective decision entropy across human and AI agents."""
    counts = {c: choices.count(c) for c in set(choices)}
    total = len(choices)
    entropy = 0
    for count in counts.values():
        p = count / total
        entropy -= p * math.log2(p)
    return entropy

def calculate_trust_volatility(trust_history):
    """Quantifies stability of human-AI trust adaptation over rounds."""
    changes = [abs(trust_history[i] - trust_history[i-1]) 
               for i in range(1, len(trust_history))]
    return sum(changes) / len(changes) if changes else 0

def get_environment(round_num):
    """Generates non-stationary payoff environments with phase shifts."""
    if round_num < 300:
        prob_A, prob_B = 0.7, 0.3
    elif round_num < 600:
        prob_A, prob_B = 0.4, 0.6
    else:
        prob_A, prob_B = 0.5, 0.5

    option_A = {"prob": prob_A, "reward": 10}
    option_B = {"prob": prob_B, "reward": 50}
    return option_A, option_B

def play_round(choice, round_num):
    option_A, option_B = get_environment(round_num)
    option = option_A if choice == "A" else option_B
    return option["reward"] if random.random() < option["prob"] else 0

# HUMAN AGENT WITH ADAPTIVE TRUST
class HumanAgent:
    def __init__(self, name, risk_tolerance):
        self.name = name
        self.risk_tolerance = risk_tolerance
        self.trust = 0.5

    def choose(self):
        return "B" if random.random() < self.risk_tolerance else "A"

    def reconsider(self, ai_choice, peer_choices):
        # AI influence weighted by dynamically updated trust
        ai_influence = ai_choice if random.random() < self.trust else None

        # Peer majority influence
        majority = max(set(peer_choices), key=peer_choices.count)
        peer_influence = majority if random.random() < 0.5 else None

        influences = [i for i in [ai_influence, peer_influence] if i]
        return random.choice(influences) if influences else self.choose()

    def update_trust(self, ai_reward):
        if ai_reward > 0:
            self.trust = min(1.0, self.trust + 0.01)
        else:
            self.trust = max(0.0, self.trust - 0.01)

# AI AGENT WITH STRATEGIES
class AIAgent:
    def __init__(self, name, strategy="rational", error_rate=0.1):
        self.name = name
        self.strategy = strategy
        self.error_rate = error_rate

    def choose(self):
        ev_A = 0.7 * 10
        ev_B = 0.3 * 50
        rational_choice = "B" if ev_B > ev_A else "A"

        if self.strategy == "rational":
            choice = rational_choice
        elif self.strategy == "conservative":
            choice = "A"
        elif self.strategy == "risky":
            choice = "B"
        else:
            choice = rational_choice

        if random.random() < self.error_rate:
            choice = "A" if choice == "B" else "B"
        return choice

# GROUP DECISION MECHANISM
def group_decision(choices, ai_choice, method="majority"):
    if method == "majority":
        return max(set(choices), key=choices.count)
    elif method == "confidence":
        weighted_choices = choices + [ai_choice] * 2
        return max(set(weighted_choices), key=weighted_choices.count)
    elif method == "ai_leader":
        return ai_choice
    return max(set(choices), key=choices.count)

# MAIN SIMULATION ENTRYPOINT
def run_simulation(rounds=1000):
    humans = [HumanAgent("Safe", 0.2), HumanAgent("Balanced", 0.5), HumanAgent("Risky", 0.8)]
    ai = AIAgent("AI", strategy="rational", error_rate=0.15)
    
    human_only_total, ai_only_total, human_ai_total = 0, 0, 0
    trust_history, entropy_history = [], []
    
    for round_num in range(rounds):
        # Baseline Humans
        for human in humans:
            human_only_total += play_round(human.choose(), round_num)

        # Baseline AI
        ai_choice = ai.choose()
        ai_reward = play_round(ai_choice, round_num)
        ai_only_total += ai_reward

        # Influence & Reconsideration
        peer_choices = [h.choose() for h in humans]
        final_choices = []
        for human in humans:
            final = human.reconsider(ai_choice, peer_choices)
            final_choices.append(final)
            human.update_trust(ai_reward)

        entropy_history.append(calculate_entropy(final_choices))
        group_choice = group_decision(final_choices, ai_choice, method="majority")
        human_ai_total += play_round(group_choice, round_num) * len(humans)
        trust_history.append(sum(h.trust for h in humans) / len(humans))

    return human_only_total / rounds, ai_only_total / rounds, human_ai_total / rounds

if __name__ == "__main__":
    print("Executing Multi-Agent Collective Intelligence Simulation (1,000 Rounds)...")
    run_simulation(1000)`

  // Rich Python Syntax Highlighting Engine with High-Contrast Tokens
  const renderPythonCode = (code: string) => {
    const lines = code.split("\n")
    return (
      <div
        className={`text-[14px] leading-[25px] antialiased select-text ${codeDefaultText}`}
        style={codeFontFamily}
      >
        {lines.map((line, idx) => (
          <div key={idx} className="flex hover:bg-black/5 dark:hover:bg-white/5 py-0.5 group">
            <span
              className={`w-12 select-none text-right pr-4 shrink-0 text-xs font-mono border-r border-gray-500/15 ${
                isDarkMode ? "text-[#858585] group-hover:text-gray-300" : "text-[#6e7781] group-hover:text-gray-900"
              }`}
            >
              {idx + 1}
            </span>
            <span className="flex-1 whitespace-pre pl-4">
              {highlightTokens(line)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const highlightTokens = (line: string) => {
    if (!line) return " "

    // Handle Comment
    const commentIdx = line.indexOf("#")
    if (commentIdx !== -1) {
      const codePart = line.substring(0, commentIdx)
      const commentPart = line.substring(commentIdx)
      return (
        <>
          {tokenizeCode(codePart)}
          <span className={isDarkMode ? "text-[#6a9955] italic font-normal" : "text-[#008000] italic font-normal"}>
            {commentPart}
          </span>
        </>
      )
    }

    return tokenizeCode(line)
  }

  const tokenizeCode = (codeText: string) => {
    if (!codeText) return null

    // Comprehensive token regex:
    // 1: Strings (double / single quotes)
    // 2: Python declaration keywords
    // 3: Control flow keywords
    // 4: Constants & self
    // 5: Built-in functions
    // 6: Numbers
    // 7: Function call or def
    // 8: Classes
    const tokenRegex =
      /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:def|class|import|from|as|global|lambda|pass)\b)|(\b(?:return|if|elif|else|for|in|while|try|except|with|yield|not|and|or|is)\b)|(\b(?:True|False|None|self)\b)|(\b(?:len|sum|range|set|max|min|abs|round|print|int|float|str|list|dict|open)\b)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*(?=\())|(\b[A-Z][a-zA-Z0-9_]*\b)/g

    const parts = []
    let lastIndex = 0
    let match

    while ((match = tokenRegex.exec(codeText)) !== null) {
      if (match.index > lastIndex) {
        // Plain text: punctuation, variables, operators - explicitly colored!
        parts.push(
          <span key={`plain-${lastIndex}`} className={isDarkMode ? "text-[#d4d4d4]" : "text-[#1f2328]"}>
            {codeText.substring(lastIndex, match.index)}
          </span>
        )
      }

      if (match[1]) {
        // String
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#ce9178] font-medium" : "text-[#a31515] font-medium"}>
            {match[1]}
          </span>
        )
      } else if (match[2]) {
        // Declaration Keyword (def, class, import...)
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#569cd6] font-semibold" : "text-[#0000ff] font-semibold"}>
            {match[2]}
          </span>
        )
      } else if (match[3]) {
        // Control flow Keyword (return, if, for...)
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#c586c0] font-semibold" : "text-[#af00db] font-semibold"}>
            {match[3]}
          </span>
        )
      } else if (match[4]) {
        // Constants & self
        const isSelf = match[4] === "self"
        parts.push(
          <span
            key={match.index}
            className={
              isSelf
                ? isDarkMode
                  ? "text-[#569cd6] italic"
                  : "text-[#0000ff] italic"
                : isDarkMode
                  ? "text-[#569cd6] font-medium"
                  : "text-[#0000ff] font-medium"
            }
          >
            {match[4]}
          </span>
        )
      } else if (match[5]) {
        // Built-ins (len, sum, range...)
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#4ec9b0] font-medium" : "text-[#267f99] font-medium"}>
            {match[5]}
          </span>
        )
      } else if (match[6]) {
        // Number
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#b5cea8] font-mono" : "text-[#098658] font-mono"}>
            {match[6]}
          </span>
        )
      } else if (match[7]) {
        // Function Name
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#dcdcaa] font-medium" : "text-[#795e26] font-medium"}>
            {match[7]}
          </span>
        )
      } else if (match[8]) {
        // Class Name
        parts.push(
          <span key={match.index} className={isDarkMode ? "text-[#4ec9b0] font-semibold" : "text-[#267f99] font-semibold"}>
            {match[8]}
          </span>
        )
      }

      lastIndex = tokenRegex.lastIndex
    }

    if (lastIndex < codeText.length) {
      parts.push(
        <span key={`tail-${lastIndex}`} className={isDarkMode ? "text-[#d4d4d4]" : "text-[#1f2328]"}>
          {codeText.substring(lastIndex)}
        </span>
      )
    }

    return parts
  }

  return (
    <div className={`h-full w-full ${vsBg} flex flex-col overflow-hidden transition-colors duration-200 select-none`}>
      {/* Lightbox / Zoom Modal for Final Simulation Plots */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className={`max-w-3xl w-full rounded-2xl overflow-hidden border shadow-2xl p-4 sm:p-6 ${
              isDarkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-white border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-500/20 mb-4">
              <div>
                <h3 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {enlargedImage.title}
                </h3>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {enlargedImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => setEnlargedImage(null)}
                className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-xl p-3 border border-gray-300 shadow-inner flex items-center justify-center">
              <img
                src={enlargedImage.src}
                alt={enlargedImage.title}
                className="w-full max-h-[65vh] object-contain rounded"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="font-mono text-gray-500">Matplotlib Visualization Figure Output</span>
              <a
                href={enlargedImage.src}
                download
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Save Figure</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Top Titlebar */}
      <div className={`h-10 ${titlebarBg} flex items-center justify-between px-3 border-b ${borderCol} shrink-0`}>
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#007acc]" />
          <span className={`text-xs font-sans font-semibold tracking-tight ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Collective-Intelligence — Visual Studio Code
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* PRIMARY RUN SIMULATOR BUTTON */}
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#007acc] hover:bg-[#0098ff] active:scale-95 text-white text-xs font-semibold shadow transition-all cursor-pointer disabled:opacity-50"
            title="Execute simulation to generate and view final simulation plots"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "Running Simulation..." : "Run Simulator"}</span>
          </button>

          {/* Simulation Results Tab Button */}
          <button
            onClick={() => setActiveTab("results")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "results"
                ? "bg-[#094771] text-white shadow-sm ring-1 ring-[#007acc]"
                : isDarkMode
                  ? "bg-white/5 hover:bg-white/10 text-gray-200"
                  : "bg-black/5 hover:bg-black/10 text-gray-800"
            }`}
            title="View the final simulation plots and research analysis"
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Final Simulations</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <a
            href="https://github.com/jyotydivya/Collective-Intelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-xs font-medium opacity-90 hover:opacity-100 transition-colors"
          >
            <span>GitHub Repo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar Left */}
        <div className={`w-12 ${sidebarBg} border-r ${borderCol} flex flex-col items-center py-3 gap-5 shrink-0`}>
          <div
            onClick={() => setActiveTab("simulator.py")}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === "simulator.py"
                ? "border-l-2 border-[#007acc] text-[#007acc] bg-black/5 dark:bg-white/5"
                : "text-gray-400 hover:text-white"
            }`}
            title="Explorer (Files)"
          >
            <Folder className="w-5 h-5" />
          </div>

          <div
            onClick={() => setActiveTab("results")}
            className={`p-2 rounded-lg cursor-pointer transition-colors relative ${
              activeTab === "results"
                ? "border-l-2 border-amber-400 text-amber-400 bg-black/5 dark:bg-white/5"
                : "text-gray-400 hover:text-amber-400"
            }`}
            title="Final Simulations (Plots & Results)"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              showTerminal ? "text-[#007acc] bg-black/5 dark:bg-white/5" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setShowTerminal(!showTerminal)}
            title="Toggle Integrated Terminal"
          >
            <TerminalIcon className="w-5 h-5" />
          </div>
        </div>

        {/* File Explorer Sidebar - High-Contrast & Readable Typography */}
        <div className={`w-64 ${sidebarBg} border-r ${borderCol} flex flex-col shrink-0 overflow-y-auto`}>
          <div className="p-3 text-[11px] font-bold tracking-wider uppercase flex items-center justify-between border-b border-gray-500/15">
            <span className={isDarkMode ? "text-gray-300 font-semibold" : "text-gray-700 font-semibold"}>
              EXPLORER: PROJECT
            </span>
          </div>

          <div className="p-2 space-y-1">
            {/* Project Root Folder */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-md text-[13px] font-bold tracking-tight text-blue-500 dark:text-blue-400"
              onClick={() => setIsFolderOpen(!isFolderOpen)}
            >
              {isFolderOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              <Folder className="w-4 h-4 fill-current opacity-80" />
              <span className="truncate">COLLECTIVE-INTELLIGENCE</span>
            </div>

            {isFolderOpen && (
              <div className="ml-3 pl-2.5 border-l border-gray-500/25 space-y-1 mt-1">
                {/* File: simulator.py */}
                <button
                  onClick={() => setActiveTab("simulator.py")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-[13.5px] transition-colors cursor-pointer ${
                    activeTab === "simulator.py"
                      ? "bg-[#094771] text-white font-semibold shadow-sm border-l-2 border-[#007acc]"
                      : isDarkMode
                        ? "text-[#cccccc] hover:text-white hover:bg-white/5"
                        : "text-[#24292f] hover:text-black hover:bg-black/5"
                  }`}
                >
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-xs text-amber-400">
                    🐍
                  </span>
                  <span className="truncate">simulator.py</span>
                </button>

                {/* Final Simulations Tab Shortcut */}
                <button
                  onClick={() => setActiveTab("results")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-[13.5px] transition-colors cursor-pointer ${
                    activeTab === "results"
                      ? "bg-[#094771] text-white font-semibold shadow-sm border-l-2 border-amber-400"
                      : isDarkMode
                        ? "text-amber-300 hover:text-amber-200 hover:bg-white/5"
                        : "text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate font-semibold">Final Simulations ✨</span>
                </button>

                {/* File: README.md */}
                <button
                  onClick={() => setActiveTab("README.md")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-[13.5px] transition-colors cursor-pointer ${
                    activeTab === "README.md"
                      ? "bg-[#094771] text-white font-semibold shadow-sm border-l-2 border-[#007acc]"
                      : isDarkMode
                        ? "text-[#cccccc] hover:text-white hover:bg-white/5"
                        : "text-[#24292f] hover:text-black hover:bg-black/5"
                  }`}
                >
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">README.md</span>
                </button>

                {/* File: requirements.txt */}
                <button
                  onClick={() => setActiveTab("requirements.txt")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-[13.5px] transition-colors cursor-pointer ${
                    activeTab === "requirements.txt"
                      ? "bg-[#094771] text-white font-semibold shadow-sm border-l-2 border-[#007acc]"
                      : isDarkMode
                        ? "text-[#cccccc] hover:text-white hover:bg-white/5"
                        : "text-[#24292f] hover:text-black hover:bg-black/5"
                  }`}
                >
                  <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">requirements.txt</span>
                </button>

                {/* File: simulation_results.csv */}
                <button
                  onClick={() => setActiveTab("simulation_results.csv")}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2.5 text-[13.5px] transition-colors cursor-pointer ${
                    activeTab === "simulation_results.csv"
                      ? "bg-[#094771] text-white font-semibold shadow-sm border-l-2 border-[#007acc]"
                      : isDarkMode
                        ? "text-[#cccccc] hover:text-white hover:bg-white/5"
                        : "text-[#24292f] hover:text-black hover:bg-black/5"
                  }`}
                >
                  <Table className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="truncate">simulation_results.csv</span>
                </button>
              </div>
            )}
          </div>

          {/* Explorer Footer info */}
          <div className="mt-auto p-4 border-t border-gray-500/15">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <p className={`font-bold text-xs ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Divya Jyoty</p>
            </div>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Multi-Agent AI Simulation Research
            </p>
            <a
              href="https://github.com/jyotydivya/Collective-Intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] mt-1.5 text-blue-500 hover:underline block font-mono"
            >
              github.com/jyotydivya
            </a>
          </div>
        </div>

        {/* Editor & Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* File Tabs Header */}
          <div className={`h-10 flex items-center border-b ${borderCol} ${titlebarBg} px-1 overflow-x-auto shrink-0 select-none`}>
            {/* Tab: simulator.py */}
            <div
              onClick={() => setActiveTab("simulator.py")}
              className={`h-full px-4 flex items-center gap-2 cursor-pointer text-[13px] transition-colors border-r ${borderCol} ${
                activeTab === "simulator.py" ? activeTabBg : inactiveTabBg
              }`}
            >
              <span>🐍</span>
              <span>simulator.py</span>
            </div>

            {/* Tab: Final Simulations (Results) */}
            <div
              onClick={() => setActiveTab("results")}
              className={`h-full px-4 flex items-center gap-2 cursor-pointer text-[13px] transition-colors border-r ${borderCol} ${
                activeTab === "results" ? activeTabBg : inactiveTabBg
              }`}
            >
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Final Simulations</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Tab: README.md */}
            <div
              onClick={() => setActiveTab("README.md")}
              className={`h-full px-4 flex items-center gap-2 cursor-pointer text-[13px] transition-colors border-r ${borderCol} ${
                activeTab === "README.md" ? activeTabBg : inactiveTabBg
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>README.md</span>
            </div>

            {/* Tab: requirements.txt */}
            <div
              onClick={() => setActiveTab("requirements.txt")}
              className={`h-full px-4 flex items-center gap-2 cursor-pointer text-[13px] transition-colors border-r ${borderCol} ${
                activeTab === "requirements.txt" ? activeTabBg : inactiveTabBg
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>requirements.txt</span>
            </div>

            {/* Tab: simulation_results.csv */}
            <div
              onClick={() => setActiveTab("simulation_results.csv")}
              className={`h-full px-4 flex items-center gap-2 cursor-pointer text-[13px] transition-colors border-r ${borderCol} ${
                activeTab === "simulation_results.csv" ? activeTabBg : inactiveTabBg
              }`}
            >
              <Table className="w-3.5 h-3.5 text-teal-400" />
              <span>simulation_results.csv</span>
            </div>
          </div>

          {/* TAB 1: FINAL SIMULATIONS VIEW (Triggered on simulator button click) */}
          {activeTab === "results" && (
            <div className={`flex-1 p-4 sm:p-6 overflow-auto ${vsBg} select-text`}>
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Result Header Banner with Run Animation */}
                <div
                  className={`p-5 rounded-2xl border ${cardBg} shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Final Simulations: Collective-Intelligence
                      </h2>
                    </div>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                      Completed execution of 1,000 multi-agent rounds in a non-stationary stochastic environment.
                      Visualizing final performance comparison and adaptive trust curves.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={handleRunSimulation}
                      disabled={isRunning}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#007acc] hover:bg-[#0098ff] active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRunning ? "animate-spin" : ""}`} />
                      <span>{isRunning ? "Simulating..." : "Re-run Simulation"}</span>
                    </button>
                  </div>
                </div>

                {/* Progress bar during simulation */}
                {isRunning && (
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 animate-pulse">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-2">
                      <span>Simulating Dynamic Payoffs (Rounds 1 → 1000)...</span>
                      <span>Processing Agent Reconsiderations</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full animate-pulse w-full"></div>
                    </div>
                  </div>
                )}

                {/* Primary Quantitative Performance Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border ${cardBg} shadow-sm flex flex-col justify-between`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      Humans Acting Alone
                    </span>
                    <div className="my-2.5 flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-gray-400">{metrics.humansOnly}</span>
                      <span className="text-xs text-gray-500">avg reward</span>
                    </div>
                    <span className="text-xs text-gray-500">Baseline without AI influence</span>
                  </div>

                  <div className={`p-4 rounded-xl border ${cardBg} shadow-sm flex flex-col justify-between`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                      AI Acting Alone
                    </span>
                    <div className="my-2.5 flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-blue-400">{metrics.aiOnly}</span>
                      <span className="text-xs text-blue-500">avg reward</span>
                    </div>
                    <span className="text-xs text-blue-500">Rational Expected Value strategy</span>
                  </div>

                  <div
                    className={`p-4 rounded-xl border border-emerald-500/40 shadow-sm ${
                      isDarkMode ? "bg-emerald-950/25" : "bg-emerald-50"
                    } flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Collaborative Humans + AI
                      </span>
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="my-2.5 flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {metrics.humansAi}
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">avg reward</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Robust Synergy Across Non-Stationary Environments
                    </span>
                  </div>
                </div>

                {/* THE 2 FINAL SIMULATION MATPLOTLIB PLOTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Figure 1: Performance Comparison Plot */}
                  <div
                    className={`p-5 rounded-2xl border ${cardBg} shadow-md flex flex-col group transition-all hover:border-[#007acc]/60`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        <h3 className={`text-sm font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          Figure 1: Performance Comparison
                        </h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 font-mono font-medium">
                        performance.png
                      </span>
                    </div>

                    {/* Image Container with click-to-enlarge */}
                    <div
                      className="bg-white rounded-xl p-3 flex items-center justify-center overflow-hidden border border-gray-300 relative cursor-pointer group-hover:shadow-lg transition-shadow"
                      onClick={() =>
                        setEnlargedImage({
                          src: "/performance.png",
                          title: "Figure 1: Collective Intelligence Comparison (performance.png)",
                          subtitle: "Matplotlib simulation bar chart comparing average rewards across agent configurations.",
                        })
                      }
                    >
                      <img
                        src="/performance.png"
                        alt="Collective Intelligence Performance Comparison Plot"
                        className="w-full h-auto object-contain rounded transition-transform group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[1px]">
                        <ZoomIn className="w-4 h-4" />
                        <span>Click to Enlarge</span>
                      </div>
                    </div>

                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-400">Analysis:</span>
                        <span className="text-emerald-500 font-medium font-mono">Humans: 33.4 | AI: 13.0 | Both: 32.8</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                        Bar plot generated from 1,000 simulation rounds. AI acting alone fails severely during payoff phase shifts (avg reward: 13.0), whereas human-AI synergy preserves robust returns (32.8).
                      </p>
                    </div>
                  </div>

                  {/* Figure 2: Trust Evolution Plot */}
                  <div
                    className={`p-5 rounded-2xl border ${cardBg} shadow-md flex flex-col group transition-all hover:border-emerald-500/60`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <h3 className={`text-sm font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          Figure 2: Trust Evolution Over Time
                        </h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-medium">
                        trust.png
                      </span>
                    </div>

                    {/* Image Container with click-to-enlarge */}
                    <div
                      className="bg-white rounded-xl p-3 flex items-center justify-center overflow-hidden border border-gray-300 relative cursor-pointer group-hover:shadow-lg transition-shadow"
                      onClick={() =>
                        setEnlargedImage({
                          src: "/trust.png",
                          title: "Figure 2: Trust Evolution Over Time (trust.png)",
                          subtitle: "Matplotlib simulation line graph showing adaptive trust dynamics across 1,000 rounds.",
                        })
                      }
                    >
                      <img
                        src="/trust.png"
                        alt="Trust Evolution Over Time Plot"
                        className="w-full h-auto object-contain rounded transition-transform group-hover:scale-[1.01]"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs backdrop-blur-[1px]">
                        <ZoomIn className="w-4 h-4" />
                        <span>Click to Enlarge</span>
                      </div>
                    </div>

                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-400">Analysis:</span>
                        <span className="text-blue-400 font-medium font-mono">Initial: 0.50 → Equilibrium: 0.00-0.05</span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                        Dynamic curve tracking adaptive trust over 1,000 rounds. When AI suffers systematic errors during environment transitions, humans quickly downweight AI guidance to protect group outcomes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantitative Research Metrics Grid */}
                <div className={`p-5 rounded-2xl border ${cardBg}`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-purple-400">
                    <Award className="w-4 h-4" />
                    <span>Advanced Quantitative Research Metrics</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-500/15">
                      <span className="opacity-80 block mb-1 font-semibold">Average Decision Entropy</span>
                      <span className="text-xl font-bold font-mono text-purple-400">{metrics.entropy}</span>
                      <p className="text-[11px] opacity-70 mt-1 leading-relaxed">
                        Quantifies diversity in agent votes. High entropy indicates balanced deliberation before consensus.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-500/15">
                      <span className="opacity-80 block mb-1 font-semibold">Trust Volatility Index</span>
                      <span className="text-xl font-bold font-mono text-cyan-400">{metrics.volatility}</span>
                      <p className="text-[11px] opacity-70 mt-1 leading-relaxed">
                        Measures inter-round variance in trust scores. Demonstrates smooth rather than chaotic adaptation.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-500/15">
                      <span className="opacity-80 block mb-1 font-semibold">Minority Correctness Rate</span>
                      <span className="text-xl font-bold font-mono text-amber-400">{metrics.minorityCorrect}</span>
                      <p className="text-[11px] opacity-70 mt-1 leading-relaxed">
                        Percentage of rounds where lone dissenting agents correctly identified the optimal choice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIMULATOR.PY CODE VIEW WITH HIGH CONTRAST & READABLE FONTS */}
          {activeTab === "simulator.py" && (
            <div className={`flex-1 flex flex-col overflow-hidden ${vsBg}`}>
              {/* CodeLens Action Bar */}
              <div className={`h-8 px-4 border-b ${borderCol} flex items-center justify-between text-xs ${titlebarBg}`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRunSimulation}
                    className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 font-semibold cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Simulation (Collective-Intelligence)</span>
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={() => setActiveTab("results")}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>View Final Plots (performance.png & trust.png)</span>
                  </button>
                </div>
                <span className="text-gray-500 font-mono text-[11px]">Python 3.11 · UTF-8</span>
              </div>

              {/* Code Content */}
              <div className="flex-1 overflow-auto p-3 sm:p-4 select-text">
                {renderPythonCode(simulatorPythonCode)}
              </div>
            </div>
          )}

          {/* TAB 3: README.MD VIEW */}
          {activeTab === "README.md" && (
            <div className={`flex-1 p-6 sm:p-8 overflow-auto ${vsBg} select-text`}>
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="border-b pb-4 border-gray-500/20">
                  <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Collective Intelligence
                  </h1>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                    Multi-agent simulation exploring human-AI collaborative decision-making, dynamic trust adaptation,
                    and emergent group intelligence in non-stationary payoff environments.
                  </p>
                  <div className="flex gap-4 text-xs font-mono mt-3 text-gray-500">
                    <span>Author: Divya Jyoty</span>
                    <span>License: MIT</span>
                    <span>Language: Python 3.11</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${cardBg}`}>
                  <h2 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    System Architecture
                  </h2>
                  <pre
                    className="text-xs leading-relaxed overflow-x-auto p-4 bg-black/20 dark:bg-black/40 rounded-lg text-emerald-400"
                    style={codeFontFamily}
                  >
{`┌─────────────────────────────────┐
│     Multi-Agent Ecosystem       │
│  [Human Agents]   [AI Agents]   │
│   (Varying Risk)   (Strategies) │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│       Influence Network         │
│   • AI → Human Influence        │
│   • Peer → Peer Influence       │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   Collective Decision Engine    │
│   • Majority Voting             │
│   • Confidence Weighting        │
│   • AI Leadership Override      │
└─────────────────────────────────┘`}
                  </pre>
                </div>

                <div className="space-y-3 text-sm leading-relaxed">
                  <h2 className={`text-base font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Research Methodology
                  </h2>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    The simulation tests whether heterogeneous groups composed of diverse human agents (Safe, Balanced, Risky) and rational AI agents can achieve greater performance than either acting in isolation.
                  </p>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    Agents operate over 1,000 rounds where payoff probabilities shift without warning (non-stationary environment). Human agents adapt their trust in AI dynamically based on the success of prior recommendations.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleRunSimulation}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#007acc] hover:bg-[#0098ff] text-white text-xs font-bold transition-all shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Simulation & View Final Plots</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REQUIREMENTS.TXT VIEW */}
          {activeTab === "requirements.txt" && (
            <div className={`flex-1 p-6 overflow-auto select-text ${vsBg}`} style={codeFontFamily}>
              <div className="max-w-md space-y-2 text-[14px]">
                <div className="flex items-center gap-4">
                  <span className="w-8 select-none text-right text-gray-500 font-mono text-xs">1</span>
                  <span className={isDarkMode ? "text-[#9cdcfe]" : "text-[#001080]"}>matplotlib</span>
                  <span className={isDarkMode ? "text-[#d4d4d4]" : "text-[#24292f]"}>&gt;=</span>
                  <span className={isDarkMode ? "text-[#b5cea8]" : "text-[#098658]"}>3.7.0</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 select-none text-right text-gray-500 font-mono text-xs">2</span>
                  <span className={isDarkMode ? "text-[#9cdcfe]" : "text-[#001080]"}>numpy</span>
                  <span className={isDarkMode ? "text-[#d4d4d4]" : "text-[#24292f]"}>&gt;=</span>
                  <span className={isDarkMode ? "text-[#b5cea8]" : "text-[#098658]"}>1.24.0</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-8 select-none text-right text-gray-500 font-mono text-xs">3</span>
                  <span className={isDarkMode ? "text-[#9cdcfe]" : "text-[#001080]"}>scipy</span>
                  <span className={isDarkMode ? "text-[#d4d4d4]" : "text-[#24292f]"}>&gt;=</span>
                  <span className={isDarkMode ? "text-[#b5cea8]" : "text-[#098658]"}>1.10.0</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SIMULATION_RESULTS.CSV VIEW */}
          {activeTab === "simulation_results.csv" && (
            <div className={`flex-1 p-6 overflow-auto select-text ${vsBg}`} style={codeFontFamily}>
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-3 text-xs opacity-80">
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>simulation_results.csv (1,000 rows logged)</span>
                  <span className="text-gray-500">UTF-8 · Comma Separated Values</span>
                </div>
                <div className={`rounded-xl border ${borderCol} overflow-hidden shadow-sm`}>
                  <table className="w-full text-left text-xs">
                    <thead className={sidebarBg}>
                      <tr className="border-b border-gray-500/20 font-semibold">
                        <th className="p-3">Round</th>
                        <th className="p-3">Average_Trust</th>
                        <th className="p-3">Decision_Entropy</th>
                        <th className="p-3">Selected_Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-500/10">
                      <tr>
                        <td className="p-2.5 font-mono">0</td>
                        <td className="p-2.5 font-mono text-blue-400 font-medium">0.500</td>
                        <td className="p-2.5 font-mono text-purple-400">0.637</td>
                        <td className="p-2.5 font-bold text-emerald-400">B</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">1</td>
                        <td className="p-2.5 font-mono text-blue-400 font-medium">0.503</td>
                        <td className="p-2.5 font-mono text-purple-400">0.589</td>
                        <td className="p-2.5 font-bold text-emerald-400">B</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">2</td>
                        <td className="p-2.5 font-mono text-blue-400 font-medium">0.506</td>
                        <td className="p-2.5 font-mono text-purple-400">0.612</td>
                        <td className="p-2.5 font-bold text-amber-400">A</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">3</td>
                        <td className="p-2.5 font-mono text-blue-400 font-medium">0.509</td>
                        <td className="p-2.5 font-mono text-purple-400">0.640</td>
                        <td className="p-2.5 font-bold text-emerald-400">B</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-gray-500 font-mono">...</td>
                        <td className="p-2.5 text-gray-500 font-mono">...</td>
                        <td className="p-2.5 text-gray-500 font-mono">...</td>
                        <td className="p-2.5 text-gray-500">...</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">998</td>
                        <td className="p-2.5 font-mono text-emerald-400 font-medium">0.024</td>
                        <td className="p-2.5 font-mono text-purple-400">0.684</td>
                        <td className="p-2.5 font-bold text-emerald-400">B</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono">999</td>
                        <td className="p-2.5 font-mono text-emerald-400 font-medium">0.021</td>
                        <td className="p-2.5 font-mono text-purple-400">0.680</td>
                        <td className="p-2.5 font-bold text-emerald-400">B</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Integrated Terminal Panel */}
          {showTerminal && (
            <div className={`h-44 border-t ${borderCol} ${isDarkMode ? "bg-[#181818]" : "bg-[#f8f9fa]"} flex flex-col shrink-0`}>
              <div className="h-7 px-3 bg-black/10 dark:bg-white/5 border-b border-gray-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#007acc]" />
                  <span className="font-semibold">Terminal — zsh (python 3.11)</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="hover:opacity-100 opacity-60 cursor-pointer text-xs p-1"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 p-3 overflow-y-auto font-mono text-xs leading-relaxed select-text" style={codeFontFamily}>
                {terminalLogs.map((line, idx) => (
                  <div key={idx} className="whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VS Code Bottom Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs font-sans shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium">
            <GitBranch className="w-3.5 h-3.5" /> main*
          </span>
          <span>0 errors, 0 warnings</span>
          <span className="font-mono text-[11px]">Python 3.11 (virtualenv)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span>UTF-8</span>
          <span>Spaces: 4</span>
          <span>Collective-Intelligence</span>
        </div>
      </div>
    </div>
  )
}
