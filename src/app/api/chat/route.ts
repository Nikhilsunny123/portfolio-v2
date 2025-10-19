import OpenAI from "openai";

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

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!openai.apiKey) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY on server" }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const chatMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(messages ?? []).slice(-12),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ?? "";

    return new Response(
      JSON.stringify({ message: { role: "assistant", content: reply } }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error: any) {
    console.error("/api/chat error", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch response from OpenAI" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
