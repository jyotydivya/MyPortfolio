import { NextResponse } from "next/server"
import { searchKnowledgeBase } from "@/lib/project-ai"

export async function POST(req: Request) {
  try {
    const { query, customApiKey, provider } = await req.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Check if custom Gemini API Key was supplied by user
    const geminiKey = customApiKey || process.env.GEMINI_API_KEY

    if (geminiKey && (provider === "gemini" || !provider)) {
      try {
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`
        const localKnowledge = searchKnowledgeBase(query)

        const systemPrompt = `You are Safari AI Assistant inside Divya Jyoty's macOS Portfolio. 
You answer questions accurately, professionally, and in depth regarding Divya Jyoty's projects, experience, technical architecture, and background.
Here is the factual project knowledge base:
${localKnowledge.answer}

User Question: ${query}

Provide a well-structured, authoritative, technical response using clean markdown formatting.`

        const response = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            return NextResponse.json({
              answer: text,
              referencedProjects: localKnowledge.referencedProjects,
              keyMetrics: localKnowledge.keyMetrics,
              suggestedQuestions: localKnowledge.suggestedQuestions,
              thinkingSteps: [
                `Parsed query: "${query}"`,
                "Connected to Google Gemini 1.5 Flash via API",
                "Synthesized contextual response grounded in Divya's project repository data",
              ],
              isLiveLLM: true,
            })
          }
        }
      } catch (apiError) {
        console.warn("Gemini API call failed, falling back to local project RAG engine:", apiError)
      }
    }

    // Default High-Performance Knowledge Engine
    const result = searchKnowledgeBase(query)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Safari AI Error:", error)
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
  }
}
