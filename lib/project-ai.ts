export interface ProjectKnowledge {
  id: string
  title: string
  repoUrl: string
  demoUrl?: string | null
  shortDesc: string
  fullDesc: string
  techStack: string[]
  category: "aiml" | "fullstack" | "systems"
  keyMetrics: string[]
  architecture: string
  highlights: string[]
}

export interface AIResponse {
  answer: string
  referencedProjects: ProjectKnowledge[]
  keyMetrics: string[]
  suggestedQuestions: string[]
  thinkingSteps: string[]
}

export const DIVYA_KNOWLEDGE_BASE = {
  personal: {
    name: "Divya Jyoty",
    title: "AI Engineer & Full-Stack Developer",
    education: "B.Tech in Computer Science and Engineering, VIT-AP University (2022–2026), CGPA: 9.39",
    email: "jyotydivya844@gmail.com",
    phone: "+91 93418 20844",
    github: "https://github.com/jyotydivya",
    linkedin: "https://linkedin.com/in/divya-jyoty",
    location: "India",
    awards: [
      "2x Hackathon Winner at IIT Hyderabad (National Level AI & Web Innovation)",
      "Technical Lead at IETE Student Forum (Mentored 150+ students in Python, Data Structures & ML)",
    ],
    certifications: [
      "AWS Certified Cloud Practitioner (Foundational Cloud Architecture & Security)",
      "AWS Certified AI Practitioner (Machine Learning, Generative AI & Foundation Models)",
    ],
    experience: [
      {
        role: "AI Software Engineer Intern",
        company: "IBM – Adroit Technologies",
        period: "June 2024 – August 2024",
        summary:
          "Developed enterprise-grade AI solutions integrating Google Gemini API and Python Flask backends. Engineered RAG pipelines for unstructured PDF documents reducing analysis latency by 45%. Containerized microservices with Docker.",
      },
      {
        role: "Technical Lead",
        company: "IETE Student Forum",
        period: "2023 – Present",
        summary:
          "Organized university hackathons, conducted hands-on technical workshops on Python, Machine Learning, and algorithms for 150+ students.",
      },
    ],
    skills: {
      languages: ["Python", "C++", "CUDA C/C++", "JavaScript", "TypeScript", "SQL"],
      ai_ml: [
        "PyTorch",
        "TensorRT",
        "cuDNN",
        "CUDA",
        "Reinforcement Learning (DQN, Q-Learning)",
        "Scikit-learn",
        "OpenCV",
        "Hugging Face",
        "LLMs (Gemini, LLaMA)",
        "RAG Architecture",
      ],
      fullstack: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Flask",
        "WebSockets",
        "Socket.IO",
        "Tailwind CSS",
      ],
      databases_cloud: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS (EC2, S3, SageMaker)", "Docker", "Git/GitHub"],
    },
  },

  projects: [
    {
      id: "gpu-benchmark",
      title: "GPU-Accelerated ML Inference Benchmark",
      repoUrl: "https://github.com/jyotydivya/GPU-Accelerated-ML-Inference-Benchmark",
      demoUrl: null,
      shortDesc: "High-performance inference engine benchmarking across CPU, PyTorch CUDA, and TensorRT.",
      fullDesc:
        "Engineered a rigorous deep learning benchmarking suite evaluating latency, memory bandwidth, and compute throughput across CPU, PyTorch native CUDA, and NVIDIA TensorRT. Created custom CUDA C++ preprocessing kernels that achieved a 35% throughput acceleration compared to standard OpenCV CPU pipelines. Profiled execution using cuDNN and Nsight Systems, driving an 18% improvement in GPU kernel utilization.",
      techStack: ["Python", "CUDA C++", "PyTorch", "TensorRT", "cuDNN", "FastAPI", "Streamlit"],
      category: "aiml",
      keyMetrics: [
        "35% throughput acceleration via custom CUDA C++ kernels",
        "18% increase in GPU utilization with cuDNN optimization",
        "Sub-10ms inference latencies across vision and language backbones",
        "Comprehensive CPU vs CUDA vs TensorRT fp16/int8 profiling",
      ],
      architecture:
        "Input Pipeline -> Custom CUDA Kernel (Memory Coalesced Preprocessing) -> PyTorch/TensorRT Execution Engine -> cuDNN Accelerated Layers -> FastAPI Asynchronous Telemetry Server -> Streamlit Real-Time Visualizer.",
      highlights: [
        "Custom CUDA kernels with shared memory tiling for image normalization and resizing.",
        "Precision quantization (FP32 -> FP16 -> INT8) profiling with TensorRT calibration.",
        "Interactive dashboard displaying real-time FPS, GPU VRAM allocation, and thermal throttling.",
      ],
    },
    {
      id: "collective-intelligence",
      title: "Collective Intelligence (Multi-Agent Simulation)",
      repoUrl: "https://github.com/jyotydivya/Collective-Intelligence",
      demoUrl: null,
      shortDesc: "Multi-agent simulation exploring human-AI collaborative dynamics and dynamic trust modeling.",
      fullDesc:
        "Researched and built a stochastic multi-agent simulation where diverse human agents (varying risk profiles: Safe, Balanced, Risky) and rational AI agents collaborate across 1,000 rounds in non-stationary payoff environments. Implemented adaptive reinforcement trust updates, decision entropy metrics, and majority vs confidence-weighted voting. Proved that collaborative human-AI groups sustain high rewards (32.8) and prevent catastrophic failure when AI alone collapses (13.0) due to environment shifts.",
      techStack: ["Python", "NumPy", "Matplotlib", "Multi-Agent Simulation", "Stochastic Modeling"],
      category: "aiml",
      keyMetrics: [
        "32.8 average collaborative reward vs 13.0 for AI alone in non-stationary shifts",
        "Average Decision Entropy of 0.684 quantifying group cognitive diversity",
        "Trust Volatility Index of 0.012 showing stable long-term equilibrium",
        "Minority Correctness Rate of 14.3% revealing emergent wisdom of crowds",
      ],
      architecture:
        "Agent Environment Loop -> Payoff Phase Shifts (Rounds 0-300, 300-600, 600-1000) -> Human Reconsideration (AI & Peer Influence) -> Adaptive Trust Update -> Group Aggregation (Majority/Confidence) -> Matplotlib Visual Generator.",
      highlights: [
        "Dynamic trust formula updating based on historical AI prediction accuracy.",
        "Automated generation of performance.png and trust.png plots.",
        "Demonstrates algorithmic resilience against non-stationary payoff shocks.",
      ],
    },
    {
      id: "selective-intelligence",
      title: "Selective Intelligence (Cognitive Telemetry & RL)",
      repoUrl: "https://github.com/jyotydivya/Selective-Intelligence",
      demoUrl: null,
      shortDesc: "Custom Reinforcement Learning environment with 1,152 discrete states for educational intervention.",
      fullDesc:
        "Designed and formulated a custom Reinforcement Learning environment featuring 1,152 discrete states modeling student cognitive fatigue, retention, and engagement. Benchmarked Tabular Q-Learning against Deep Q-Networks (DQN) with experience replay and target networks. Built an interactive cognitive telemetry dashboard in Streamlit to visualize convergence curves, policy heatmaps, and reward functions.",
      techStack: ["Python", "PyTorch", "Reinforcement Learning", "DQN", "Q-Learning", "NumPy", "Streamlit"],
      category: "aiml",
      keyMetrics: [
        "1,152 discrete Markov Decision Process (MDP) state representations",
        "DQN convergence with ε-greedy exploration and experience replay buffer",
        "4 strategic educational intervention actions optimized dynamically",
        "Real-time policy visualization in Streamlit dashboard",
      ],
      architecture:
        "Student Cognitive Model (Fatigue, Skill, Retention) -> MDP Environment -> RL Agent (Q-Table / PyTorch DQN) -> Reward Function Optimization -> Streamlit Telemetry Dashboard.",
      highlights: [
        "Experience replay buffer with Prioritized Experience Sampling to stabilize DQN training.",
        "Comparative convergence analysis between tabular dynamic programming and deep Q-learning.",
      ],
    },
    {
      id: "skill-swap-hub",
      title: "Skill Swap Hub",
      repoUrl: "https://github.com/jyotydivya/Skill-Swap-Hub",
      demoUrl: "https://github.com/jyotydivya/Skill-Swap-Hub",
      shortDesc: "Full-stack collaborative skill marketplace with WebSockets and Razorpay integration.",
      fullDesc:
        "Architected a production-ready skill exchange platform connecting mentors and learners. Designed a 7-collection relational MongoDB schema. Implemented real-time bidirectional WebSockets communication via Socket.IO featuring live typing indicators, read receipts, and online presence tracking, cutting message latency by 50% over HTTP polling. Integrated Razorpay payment gateway with server-side HMAC-SHA256 signature verification.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "WebSockets", "Razorpay", "JWT"],
      category: "fullstack",
      keyMetrics: [
        "50% reduction in chat messaging latency with persistent WebSockets",
        "7 relational MongoDB collections with optimized indexing",
        "100% secure HMAC-SHA256 cryptographic payment verification with Razorpay",
        "Role-based JWT authentication and protected REST API endpoints",
      ],
      architecture:
        "React Frontend (Vite, Tailwind) -> Socket.IO Real-time Engine -> Express REST Gateway -> MongoDB Atlas (Mongoose ODM) -> Razorpay Webhook Verifier.",
      highlights: [
        "Real-time dual-party scheduling and session management.",
        "Secure tokenized session persistence with encrypted cookies and JWT.",
      ],
    },
    {
      id: "campus-ems",
      title: "Campus-EMS (Campus Event Management System)",
      repoUrl: "https://github.com/jyotydivya/Campus-EMS",
      demoUrl: "https://github.com/jyotydivya/Campus-EMS",
      shortDesc: "Full-stack enterprise event coordination portal with QR check-in and analytics.",
      fullDesc:
        "Built an all-in-one university campus event management platform. Features automated QR code ticket generation for contactless attendee check-in, real-time RSVP tracking, administrative analytics dashboards, and role-based access control (Student, Organizer, Faculty Admin). Built on the MERN stack with Tailwind CSS.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "QR Code Engine", "JWT"],
      category: "fullstack",
      keyMetrics: [
        "Instant contactless QR code ticket verification",
        "Real-time attendance telemetry and capacity management",
        "Role-based access control across 3 organizational tiers",
      ],
      architecture:
        "React Single Page Application -> Express REST API -> MongoDB Atlas -> QR Code Generation & Verification Engine.",
      highlights: [
        "Comprehensive event lifecycle from proposal to post-event feedback.",
        "Dynamic capacity limits preventing venue over-registration.",
      ],
    },
    {
      id: "d-ask",
      title: "D-ASK (AI Q&A & Knowledge Retrieval System)",
      repoUrl: "https://github.com/jyotydivya/D-ASK",
      demoUrl: null,
      shortDesc: "AI-driven question answering and semantic knowledge retrieval built with TypeScript.",
      fullDesc:
        "Engineered an interactive conversational knowledge retrieval engine with Next.js and TypeScript. Implements vector query parsing, instant semantic matching, and responsive chat interface for enterprise knowledge repositories.",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS", "AI Assistant", "Semantic Search"],
      category: "aiml",
      keyMetrics: [
        "Fast query resolution with client-side indexing and semantic matching",
        "Modern conversational UI with real-time markdown streaming",
      ],
      architecture: "Next.js App Router -> TypeScript Query Parser -> Semantic Vector Index -> Streaming UI.",
      highlights: ["Clean responsive glassmorphism UI with multi-turn query recall."],
    },
    {
      id: "movie-recommendation",
      title: "Movie Recommendation System",
      repoUrl: "https://github.com/jyotydivya/Movie-Recommendation-System",
      demoUrl: null,
      shortDesc: "Content-based movie recommendation engine utilizing CountVectorizer and Cosine Similarity.",
      fullDesc:
        "Developed a content-based recommendation system vectorizing 5,000+ movie metadata tags (genres, cast, crew, keywords) from TMDB dataset. Applied CountVectorizer with stop-words filtration and calculated pairwise cosine distance matrices. Deployed as an interactive Streamlit web application with poster fetching from TMDB REST API.",
      techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "TMDB API"],
      category: "aiml",
      keyMetrics: [
        "5,000+ movie metadata tag vectorization",
        "Real-time top-5 similarity ranking via cosine distance",
        "Interactive Streamlit UI with TMDB poster rendering",
      ],
      architecture: "TMDB Data Ingestion -> Vector Extraction -> Cosine Similarity Matrix -> Streamlit UI.",
      highlights: ["Tag synthesis blending overview, genre tokens, and director metadata."],
    },
    {
      id: "employee-turnover",
      title: "Employee Turnover Prediction",
      repoUrl: "https://github.com/jyotydivya/Employee-Turnover-Prediction",
      demoUrl: null,
      shortDesc: "Predictive ML classification pipeline with explainable AI (SHAP) feature importance.",
      fullDesc:
        "Built a predictive HR analytics machine learning pipeline predicting employee attrition risk. Evaluated Logistic Regression, Decision Trees, Random Forest, and XGBoost classifiers. Used SMOTE for class imbalance and integrated SHAP (SHapley Additive exPlanations) to explain individual employee risk drivers (satisfaction score, average monthly hours, evaluation).",
      techStack: ["Python", "Scikit-learn", "XGBoost", "Random Forest", "SHAP", "Pandas", "Matplotlib"],
      category: "aiml",
      keyMetrics: [
        "Over 93% classification accuracy with Random Forest and XGBoost",
        "SHAP feature importance plots identifying top 3 attrition drivers",
        "SMOTE resampling addressing severe class imbalance",
      ],
      architecture: "HR Dataset -> EDA & Preprocessing -> SMOTE Balancing -> Model Training -> SHAP Explainer.",
      highlights: ["Actionable HR decision boundaries based on satisfaction thresholds."],
    },
    {
      id: "weather-forecast-app",
      title: "Weather Forecast App",
      repoUrl: "https://github.com/jyotydivya/Weather-Forecast-App",
      demoUrl: null,
      shortDesc: "Real-time interactive weather forecast dashboard with OpenWeatherMap API.",
      fullDesc:
        "Created an intuitive weather forecast web application featuring current weather metrics, 5-day forecasts, geolocation search, humidity/pressure meters, and dynamic weather animations.",
      techStack: ["JavaScript", "HTML5", "CSS3", "OpenWeatherMap API"],
      category: "fullstack",
      keyMetrics: ["5-day future forecast telemetry", "Dynamic atmospheric state backgrounds"],
      architecture: "Geolocation API -> OpenWeatherMap REST API -> DOM Reactive Renderer.",
      highlights: ["Instant unit toggle (Celsius / Fahrenheit) and historical city caching."],
    },
  ] as ProjectKnowledge[],
}

export function searchKnowledgeBase(query: string): AIResponse {
  const q = query.toLowerCase().trim()
  const projects = DIVYA_KNOWLEDGE_BASE.projects
  const personal = DIVYA_KNOWLEDGE_BASE.personal

  // 1. Identify relevant projects by keyword matching and scoring
  const scoredProjects = projects.map((p) => {
    let score = 0
    const textToSearch = `${p.title} ${p.shortDesc} ${p.fullDesc} ${p.techStack.join(" ")} ${p.keyMetrics.join(" ")}`.toLowerCase()

    // Query terms
    const terms = q.split(/\s+/).filter((t) => t.length > 2)
    terms.forEach((term) => {
      if (textToSearch.includes(term)) score += 2
      if (p.title.toLowerCase().includes(term)) score += 5
      if (p.techStack.some((t) => t.toLowerCase().includes(term))) score += 4
    })

    // Special exact matches
    if (q.includes("cuda") || q.includes("gpu") || q.includes("tensorrt") || q.includes("inference") || q.includes("cudnn") || q.includes("throughput")) {
      if (p.id === "gpu-benchmark") score += 10
    }
    if (q.includes("collective") || q.includes("agent") || q.includes("trust") || q.includes("entropy") || q.includes("simulation") || q.includes("rounds")) {
      if (p.id === "collective-intelligence") score += 10
    }
    if (q.includes("reinforcement") || q.includes("q-learning") || q.includes("dqn") || q.includes("selective") || q.includes("states") || q.includes("rl")) {
      if (p.id === "selective-intelligence") score += 10
    }
    if (q.includes("skill") || q.includes("chat") || q.includes("websocket") || q.includes("socket") || q.includes("razorpay") || q.includes("payment")) {
      if (p.id === "skill-swap-hub") score += 10
    }
    if (q.includes("campus") || q.includes("event") || q.includes("qr") || q.includes("ems")) {
      if (p.id === "campus-ems") score += 10
    }
    if (q.includes("movie") || q.includes("recommend") || q.includes("cosine") || q.includes("vectorizer")) {
      if (p.id === "movie-recommendation") score += 10
    }
    if (q.includes("turnover") || q.includes("attrition") || q.includes("employee") || q.includes("shap") || q.includes("xgboost")) {
      if (p.id === "employee-turnover") score += 10
    }
    if (q.includes("ask") || q.includes("d-ask") || q.includes("semantic")) {
      if (p.id === "d-ask") score += 10
    }

    return { project: p, score }
  })

  scoredProjects.sort((a, b) => b.score - a.score)
  const topProjects = scoredProjects.filter((sp) => sp.score > 0).slice(0, 3).map((sp) => sp.project)

  // 2. Synthesize AI Response based on domain intents
  let answer = ""
  const keyMetrics: string[] = []
  const suggestedQuestions: string[] = []
  const thinkingSteps: string[] = [
    `Analyzing query semantics: "${query}"`,
    `Searching through 10 repositories and technical project specifications`,
    `Cross-referencing Divya Jyoty's engineering benchmarks & resume achievements`,
  ]

  // Scenario A: GPU Benchmarking / CUDA / TensorRT
  if (
    q.includes("gpu") ||
    q.includes("cuda") ||
    q.includes("tensorrt") ||
    q.includes("cudnn") ||
    q.includes("inference") ||
    q.includes("speedup") ||
    q.includes("benchmark")
  ) {
    const p = projects.find((x) => x.id === "gpu-benchmark")!
    thinkingSteps.push("Found primary match: GPU-Accelerated ML Inference Benchmark")
    thinkingSteps.push("Synthesizing throughput acceleration data and kernel architecture")

    answer = `### 🚀 GPU-Accelerated ML Inference Benchmark System

Divya Jyoty engineered a high-performance deep learning inference benchmarking suite evaluating execution performance across **CPU, PyTorch native CUDA, and NVIDIA TensorRT**.

#### Key Technical Achievements & Metrics:
- **35% Throughput Acceleration**: Developed custom **CUDA C++ preprocessing kernels** replacing bottlenecked OpenCV/Pillow CPU pipelines, using shared-memory tiling and memory-coalesced normalization.
- **18% Higher GPU Utilization**: Leveraged **cuDNN** hardware-specific acceleration routines and custom execution streams to eliminate GPU idle starvation.
- **Precision Quantization Profiling**: Profiled latency and accuracy tradeoffs across **FP32, FP16, and INT8** precision formats with TensorRT calibration caches.
- **Microservice Telemetry**: Wrapped the inference runtime in an asynchronous **FastAPI** backend with real-time telemetry piped to a **Streamlit visual dashboard**.

#### Architecture:
\`\`\`
[Input Images/Data] 
       │
       ▼
[Custom CUDA Kernel] ──(Memory Coalescing & Normalization)──> 35% Speedup
       │
       ▼
[TensorRT / PyTorch Runtime] ──(cuDNN Acceleration & INT8 Engine)──> 18% Higher GPU Util
       │
       ▼
[FastAPI Telemetry Server] ──> [Streamlit Real-Time Visualizer]
\`\`\`

This project demonstrates Divya's deep understanding of low-level GPU memory architectures, kernel optimization, and production-grade inference pipelines.`

    keyMetrics.push(...p.keyMetrics)
    suggestedQuestions.push(
      "How did custom CUDA preprocessing kernels achieve a 35% speedup?",
      "What precision modes (FP16/INT8) were evaluated with TensorRT?",
      "How does this compare to Divya's multi-agent AI research?",
    )
  }

  // Scenario B: Collective Intelligence / Multi-Agent / Trust / Simulation
  else if (
    q.includes("collective") ||
    q.includes("agent") ||
    q.includes("trust") ||
    q.includes("entropy") ||
    q.includes("multi-agent") ||
    q.includes("simulator")
  ) {
    const p = projects.find((x) => x.id === "collective-intelligence")!
    thinkingSteps.push("Found primary match: Collective Intelligence Multi-Agent Simulator")
    thinkingSteps.push("Extracting simulation findings from 1,000 stochastic rounds")

    answer = `### 🧠 Collective Intelligence: Multi-Agent Simulation Research

In this project, Divya designed and conducted a scientific multi-agent simulation exploring how **heterogeneous human agents** and **rational AI agents** converge on optimal decisions in complex, non-stationary environments.

#### Core Research Findings & Numbers:
- **Resilience Against AI Collapse**: When payoff environments abruptly shift (non-stationary phase changes), **AI acting alone suffered catastrophic failure**, dropping to an average reward of **13.0**. In contrast, **collaborative Human + AI groups achieved 32.8–33.4**, matching human intuition and filtering out bad AI suggestions.
- **Dynamic Adaptive Trust**: Human agents start with a baseline trust of 0.50. When AI provides profitable guidance, trust increases ($+0.01$); when AI leads to losses, trust drops rapidly (stabilizing between **0.00 and 0.05** during deceptive phases).
- **Average Decision Entropy (0.684)**: Quantifies group cognitive diversity and healthy deliberation before reaching consensus.
- **Trust Volatility (0.012)**: Proves that the interaction stabilizes into a calm, predictable equilibrium rather than erratic swings.
- **Minority Correctness Rate (14.3%)**: Proves that lone dissenting human agents occasionally discover the global optimum, demonstrating the emergent "wisdom of crowds".

#### Agent Ecosystem:
1. **Human Agents**: Modeled with distinct risk tolerances (*Safe*, *Balanced*, *Risky*) and peer influence functions.
2. **AI Agents**: Expected Value (EV) rational decision strategy with dynamic error injection.
3. **Aggregation Engine**: Majority voting, confidence-weighting, and leadership override.`

    keyMetrics.push(...p.keyMetrics)
    suggestedQuestions.push(
      "Why did AI alone drop to 13.0 reward while Humans + AI reached 32.8?",
      "How is decision entropy mathematically calculated in this simulation?",
      "Can I view the final performance and trust plots in the VS Code app?",
    )
  }

  // Scenario C: Selective Intelligence / Reinforcement Learning
  else if (
    q.includes("selective") ||
    q.includes("reinforcement") ||
    q.includes("rl") ||
    q.includes("q-learning") ||
    q.includes("dqn") ||
    q.includes("markov") ||
    q.includes("state")
  ) {
    const p = projects.find((x) => x.id === "selective-intelligence")!
    thinkingSteps.push("Found primary match: Selective Intelligence RL Framework")
    thinkingSteps.push("Analyzing Markov Decision Process with 1,152 states")

    answer = `### 🎯 Selective Intelligence: Reinforcement Learning Cognitive Telemetry

Divya formulated a custom **Markov Decision Process (MDP)** reinforcement learning framework designed to optimize educational interventions for student learning trajectories.

#### Key Technical Highlights:
- **1,152 Discrete MDP States**: State vectors encapsulate multi-dimensional cognitive fatigue, prior skill mastery, retention decay, and task engagement.
- **Algorithmic Benchmark**: Implemented and benchmarked **Tabular Q-Learning** against a deep neural network **Deep Q-Network (DQN)** built with PyTorch.
- **Training Stabilization**: Employed an **Experience Replay Buffer** and target networks to mitigate policy oscillations and divergence in high-dimensional state transitions.
- **Telemetry Dashboard**: Deployed an interactive **Streamlit** dashboard displaying policy value heatmaps, cumulative reward trajectories, and real-time intervention policies.

This highlights Divya's theoretical and practical mastery of Reinforcement Learning algorithms and neural policy networks.`

    keyMetrics.push(...p.keyMetrics)
    suggestedQuestions.push(
      "How did Tabular Q-Learning compare with DQN on the 1,152 state space?",
      "What four educational intervention actions were modeled?",
      "What other PyTorch projects has Divya developed?",
    )
  }

  // Scenario D: Education, Certifications, Experience, Skills, Profile
  else if (
    q.includes("who is") ||
    q.includes("about") ||
    q.includes("education") ||
    q.includes("cgpa") ||
    q.includes("vit") ||
    q.includes("certif") ||
    q.includes("aws") ||
    q.includes("experience") ||
    q.includes("intern") ||
    q.includes("ibm") ||
    q.includes("hackathon") ||
    q.includes("award") ||
    q.includes("skills") ||
    q.includes("resume") ||
    q.includes("contact") ||
    q.includes("hire")
  ) {
    thinkingSteps.push("Retrieving Divya Jyoty's academic background and credentials")
    thinkingSteps.push("Aggregating AWS certifications and professional internship experience")

    answer = `### 👨‍💻 Divya Jyoty — Profile & Credentials

Divya Jyoty is an **AI Engineer & Full-Stack Developer** pursuing a B.Tech in Computer Science and Engineering at **VIT-AP University (2022–2026)** with an outstanding **CGPA of 9.39**.

#### 🏆 Honors & Recognition:
- **2x Hackathon Winner at IIT Hyderabad**: Awarded for cutting-edge AI systems and web application development.
- **Technical Lead at IETE Student Forum**: Led technical initiatives and mentored 150+ students in Python, Data Structures, and Machine Learning.

#### ☁️ AWS Professional Certifications:
- **AWS Certified Cloud Practitioner**: Proficient in AWS core infrastructure (EC2, S3, IAM, VPC, Lambda) and cloud cost optimization.
- **AWS Certified AI Practitioner**: Certified in Foundation Models, Generative AI engineering, SageMaker model training, and AI ethics.

#### 💼 Professional Experience:
- **AI Software Engineer Intern @ IBM – Adroit Technologies** (June 2024 – August 2024):
  - Built enterprise GenAI document analysis systems leveraging **Google Gemini API** and Python Flask.
  - Engineered production RAG pipelines for unstructured PDF data, achieving a **45% reduction in extraction latency**.
  - Containerized microservices using **Docker** for cloud deployment.

#### 🛠️ Core Technology Matrix:
- **AI & Systems**: PyTorch, CUDA C++, TensorRT, cuDNN, Reinforcement Learning (DQN), Scikit-learn, LLMs (Gemini, LLaMA).
- **Web & Backend**: Next.js 15, React 19, TypeScript, Node.js, Express, FastAPI, Flask, WebSockets, Socket.IO.
- **Databases & Cloud**: MongoDB, PostgreSQL, Redis, AWS, Docker.`

    keyMetrics.push(
      "CGPA: 9.39 at VIT-AP University (Top Academic Rank)",
      "2x Hackathon Winner at IIT Hyderabad",
      "AWS Certified Cloud Practitioner & AI Practitioner",
      "IBM-Adroit Technologies Generative AI Experience",
    )
    suggestedQuestions.push(
      "What did Divya accomplish during his IBM-Adroit Technologies internship?",
      "Which projects highlight Divya's expertise in PyTorch and CUDA?",
      "How does Divya apply AWS Cloud in machine learning workflows?",
    )
  }

  // Scenario E: Full-Stack Web / Skill Swap Hub / WebSockets
  else if (
    q.includes("skill swap") ||
    q.includes("skill-swap") ||
    q.includes("swap hub") ||
    q.includes("swap") ||
    q.includes("websocket") ||
    q.includes("socket") ||
    q.includes("chat") ||
    q.includes("razorpay") ||
    q.includes("payment") ||
    q.includes("mern")
  ) {
    const p = projects.find((x) => x.id === "skill-swap-hub")!
    thinkingSteps.push("Found primary match: Skill Swap Hub Full-Stack Marketplace")
    thinkingSteps.push("Reviewing WebSockets and Razorpay HMAC verification pipeline")

    answer = `### ⚡ Skill Swap Hub: Full-Stack Real-Time Platform

**Skill Swap Hub** is a collaborative skill marketplace developed by Divya connecting learners and mentors for live peer-to-peer knowledge exchange.

#### Core Architectural Features:
- **Real-Time WebSockets Engine**: Implemented bidirectional event-driven communication via **Socket.IO**, delivering live typing indicators, instant messaging, and user presence with a **50% latency drop** over standard HTTP polling.
- **7-Collection Relational MongoDB Schema**: Structured schemas for Users, Skill Listings, Exchange Requests, Reviews, Transactions, Chat Channels, and Messages with compound indexes for rapid query resolution.
- **Cryptographic Payment Gateway**: Integrated **Razorpay** checkout with server-side **HMAC-SHA256 signature verification** to prevent payment tampering and replay attacks.
- **Secure Authentication**: Implemented stateless JSON Web Tokens (**JWT**) with HTTP-only cookies and bcrypt password hashing.

#### Tech Stack:
\`React.js\` · \`Node.js\` · \`Express.js\` · \`MongoDB Atlas\` · \`Socket.IO\` · \`Razorpay\` · \`Tailwind CSS\``

    keyMetrics.push(...p.keyMetrics)
    suggestedQuestions.push(
      "How does the HMAC-SHA256 signature verification work with Razorpay?",
      "What database collections make up Skill Swap Hub?",
      "What other full-stack projects has Divya built?",
    )
  }

  // Scenario F: General Project Overview / All Projects
  else {
    thinkingSteps.push("Identified broad project inquiry")
    thinkingSteps.push("Summarizing top repositories across AI/ML, Systems, and Full-Stack")

    answer = `### 📂 Divya Jyoty's Engineering Portfolio & Key Projects

Divya has authored and published **10 high-impact open-source projects** spanning Deep Learning, GPU systems, Multi-Agent simulation, Reinforcement Learning, and Full-Stack engineering:

1. **[GPU-Accelerated ML Inference Benchmark](https://github.com/jyotydivya/GPU-Accelerated-ML-Inference-Benchmark)**:
   - Deep learning inference suite across CPU, PyTorch CUDA, and TensorRT.
   - **Key Metric**: Custom CUDA C++ kernels delivered **35% throughput speedup**; cuDNN tuning increased GPU utilization by **18%**.

2. **[Collective-Intelligence Multi-Agent Simulator](https://github.com/jyotydivya/Collective-Intelligence)**:
   - Stochastic multi-agent modeling of human-AI group decisions across 1,000 non-stationary rounds.
   - **Key Metric**: Humans + AI reached **32.8 avg reward**, preventing collapse when AI alone dropped to **13.0**. Decision Entropy: **0.684**.

3. **[Selective-Intelligence RL Environment](https://github.com/jyotydivya/Selective-Intelligence)**:
   - Custom Reinforcement Learning environment with **1,152 discrete states** benchmarking Q-Learning vs Deep Q-Networks (DQN).

4. **[Skill-Swap-Hub](https://github.com/jyotydivya/Skill-Swap-Hub)**:
   - Collaborative skill marketplace with persistent **Socket.IO WebSockets** (50% chat latency drop) and **Razorpay HMAC-SHA256 payments**.

5. **[Campus-EMS](https://github.com/jyotydivya/Campus-EMS)**:
   - Enterprise campus event coordination platform with dynamic QR code contactless check-ins and admin telemetry.

6. **[D-ASK](https://github.com/jyotydivya/D-ASK)**:
   - Conversational AI Q&A and semantic knowledge retrieval built with TypeScript and Next.js.

7. **[Employee Turnover Prediction](https://github.com/jyotydivya/Employee-Turnover-Prediction)**:
   - Predictive ML pipeline using Random Forest & XGBoost with **SHAP explainable AI** (93%+ accuracy).

8. **[Movie Recommendation System](https://github.com/jyotydivya/Movie-Recommendation-System)**:
   - Content-based filtering engine vectorizing 5,000+ TMDB movies using CountVectorizer and Cosine Similarity.`

    keyMetrics.push(
      "10 Public GitHub Repositories",
      "35% Speedup with Custom CUDA Kernels",
      "1,152 State Discrete RL Environment",
      "50% Chat Latency Drop via WebSockets",
    )
    suggestedQuestions.push(
      "Tell me more about the GPU Inference Benchmarking system",
      "How does trust modeling work in the Collective-Intelligence project?",
      "What are Divya's skills and AWS certifications?",
    )
  }

  return {
    answer,
    referencedProjects: topProjects.length > 0 ? topProjects : projects.slice(0, 3),
    keyMetrics,
    suggestedQuestions,
    thinkingSteps,
  }
}
