import { NextResponse } from "next/server";

export const runtime = "nodejs";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are Nikhil's AI assistant, guiding visitors through his portfolio.
You answer questions about his skills, projects, and experience based on this info:

Nikhil Sunny — Full Stack Developer (3+ years)
Tech Stack: React.js, Next.js, TypeScript, Node.js, Express.js, MongoDB, MySQL, AWS, Docker.
Projects:
1. ERP Platform — React + Django + MySQL; handled lakhs of data monthly; built CI/CD with AWS & GitHub Actions.
2. Velby — Doctor payout and scheduling system using React + Node + AWS Amplify; improved admin speed by 40%.
Education: MCA (2019), BCA (2017)
GitHub: https://github.com/Nikhilsunny123
Email: nikhilsunny35@gmail.com
Location: Bangalore, India

Be concise, friendly, and on-topic for portfolio visitors.`;

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY on server" },
        { status: 500 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://your-portfolio-site.com", // optional for ranking
        "X-Title": "Nikhil Portfolio AI Chatbot",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free", // You can also try ""
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...(messages ?? []).slice(-12),
        ],
        temperature: 0.7,
      }),
    });
    if (!response.ok) throw new Error("OpenRouter API request failed");

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({
      message: { role: "assistant", content: reply },
    });
  } catch (error) {
    console.error("/api/chat error", error);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenRouter" },
      { status: 500 }
    );
  }
}
