import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chatConfig";

export const runtime = "nodejs";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Fallback chain of free models on OpenRouter
const FALLBACK_MODELS = [
  "liquid/lfm-2.5-2.6b:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
];

// High-accuracy fallback knowledge agent when external LLM endpoints are rate-limited
function getSmartFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you") || q.length < 5) {
    return "Hello! I'm Nikhil's AI assistant. I can answer questions about his 3.3+ years of production experience, RAG pipelines, system architecture, or tech stack. How can I help you today?";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("location")) {
    return "You can reach Nikhil Sunny directly:\n• Email: nikhilsunny35@gmail.com\n• Phone: +91 9495536652\n• Location: Bangalore, India\n• GitHub: https://github.com/Nikhilsunny123\n• LinkedIn: https://www.linkedin.com/in/nikhil-sunny-48195b125";
  }

  if (q.includes("ai") || q.includes("rag") || q.includes("llm") || q.includes("vector") || q.includes("qdrant") || q.includes("langchain")) {
    return "Nikhil has extensive production AI experience:\n• Built tenant-scoped RAG pipelines using Qdrant vector DB, OpenAI, and LangChain.\n• Engineered SSE progressive token streaming for low-latency responses (<100ms).\n• Built agentic tool-calling workflows connecting LLMs to MySQL/MongoDB and business tools via n8n.\n• Completed the 'Generative AI with Large Language Models' certification by DeepLearning.AI / Coursera.";
  }

  if (q.includes("project") || q.includes("work") || q.includes("built") || q.includes("portfolio")) {
    return "Here are Nikhil's flagship production systems:\n1. Embeddable AI Support Platform (Lead Developer): Multi-tenant, Shadow DOM widget, SSE token streaming, Socket.IO presence, Qdrant RAG, JMeter tested to 1,000 concurrent WebSockets.\n2. Communications & Notification Service: Tenant-configurable outbound messaging (SMTP + Microsoft OAuth2) with webhook automation.\n3. B2B Ingredients E-Commerce: Realtime support integrated into a live Next.js storefront.\n4. Sourcing & Supplier Collaboration Platform: React, Python/Django, Celery, S3-backed document handling.";
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("languages")) {
    return "Nikhil's core technology stack includes:\n• Frontend: React, Next.js, TypeScript, Tailwind CSS, Socket.IO, SSE\n• Backend: Node.js, Express.js, FastAPI, REST APIs, Microservices, Multi-Tenancy\n• AI / LLM: OpenAI, LangChain, Qdrant, RAG, Agentic Tool-Calling, n8n\n• Cloud & DevOps: AWS (ECS/Fargate, Lambda, S3, EC2), Docker, GitHub Actions CI/CD\n• Data: MySQL, MongoDB, Redis, Elasticsearch, OAuth2, RBAC";
  }

  if (q.includes("experience") || q.includes("dietary") || q.includes("cypress") || q.includes("company") || q.includes("years")) {
    return "Nikhil brings 3.3+ years of production experience:\n• Dietary Business Intelligence (Jul 2024 - Present): Lead author across 6 of 20 microservices with 2,300+ authored commits; shipped the real-time AI customer support platform.\n• Cypress Innovative Solutions (Jan 2024 - Jul 2024): Optimized reports by ~50% across React/Node/MongoDB apps with 200+ DAU.\n• Freelance (2023): Built serverless restaurant-ordering and vehicle management platforms.\n• Neovibe Technologies (2022 - 2023): Developed Node.js REST APIs and hardened security against IDOR/XSS.";
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "You can download Nikhil's tailored resumes directly from the portfolio:\n• AI Engineer: /resumes/AI_Engineer.docx\n• Forward Deployed Engineer: /resumes/Forward_Deployed_Engineer.docx\n• Full Stack Engineer: /resumes/Full_Stack_Engineer.docx\n• Solutions Engineer: /resumes/Solutions_Engineer.docx";
  }

  return "Nikhil is a Full Stack & AI Engineer with 3.3+ years experience, 2,300+ commits across 6 microservices, and deep expertise in RAG pipelines, React, Node.js, and AWS. Feel free to ask about his specific projects, tech stack, or email him at nikhilsunny35@gmail.com.";
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };
    const latestUserMessage = messages?.filter(m => m.role === "user").pop()?.content || "";

    const apiKey = process.env.OPENROUTER_API_KEY;
    const configuredModel = process.env.OPENROUTER_MODEL;

    const modelsToTry = [
      ...(configuredModel ? [configuredModel] : []),
      ...FALLBACK_MODELS.filter(m => m !== configuredModel),
    ];

    if (apiKey) {
      for (const model of modelsToTry) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7000);

          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": "https://nikhilportfolio.vercel.app/",
              "X-Title": "Nikhil Portfolio AI Assistant",
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...(messages ?? []).slice(-8),
              ],
              temperature: 0.6,
              max_tokens: 300,
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const reply = data?.choices?.[0]?.message?.content?.trim();
            if (reply) {
              return NextResponse.json({
                message: { role: "assistant", content: reply },
              });
            }
          } else {
            const errData = await response.json().catch(() => null);
            console.warn(`Model ${model} failed (${response.status}):`, errData?.error?.message || response.statusText);
          }
        } catch (e: any) {
          console.warn(`Attempt with ${model} failed:`, e.message);
        }
      }
    }

    // Graceful fallback to smart in-memory knowledge responder
    const fallbackReply = getSmartFallbackResponse(latestUserMessage);
    return NextResponse.json({
      message: { role: "assistant", content: fallbackReply },
    });
  } catch (error) {
    console.error("/api/chat unexpected error", error);
    return NextResponse.json({
      message: {
        role: "assistant",
        content: "I'm available to answer any questions about Nikhil's experience, RAG architecture, or tech stack. You can also reach him directly at nikhilsunny35@gmail.com.",
      },
    });
  }
}
