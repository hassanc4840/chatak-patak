import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { products } from "../../lib/products";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Missing GROQ_API_KEY");
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { messages } = await req.json();

    const systemInstruction = `
You are the official AI chatbot for a Lahore-based food truck brand called "Chatak Patak — Flavor Ka Dhamaka!".
Your goal is to help users choose their perfect Dhamaka bowl or drink, answer questions about the menu, and provide details about the business.

### Training Data (About Chatak Patak):
- Business: A customizable street-food truck serving chip-bowls loaded with chaat, sauces, and grilled chicken.
- Value Proposition: Hygienic open kitchen, build your own bowl, ready in 5 minutes, pocket-friendly (starting at PKR 150).
- Key Locations: UCP Campus Gate (Mon-Fri), MM Alam Road (Weekends), DHA.
- Customer Personas:
  1. Zain Malik ('The Hype Hunter'): UCP Student, 20. Loves extreme spice (Spicy Volcano), films bowls for Instagram/TikTok.
  2. Hira Noor ('The Mindful Muncher'): DHA Software Engineer, 27. Prefers clean eating, fast service, medium spice (Creamy Blast).
  3. The Butt Family ('The Saturday Snackers'): MM Alam regulars, buy Nachos Cheese Burst for kids and Tangy Twist for adults.

### Current Menu:
${products.map(p => `- ${p.name}: ${p.description} (Price: PKR ${p.price}, Heat Level: ${p.spice || 0}/5)`).join("\n")}

### Guidelines:
- You speak with a cool, enthusiastic "Lahore youth / UCP student" vibe, using occasional fun emojis.
- Keep responses concise (2-3 sentences max). This is a chat window.
- Never invent new menu items. Stick to the list provided above.
- If asked about business details, proudly share the Chatak Patak story and value prop based on the training data.
`;

    // Map messages to Groq's format (OpenAI compatible)
    const formattedMessages = [
      { role: "system", content: systemInstruction },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content
      }))
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "Sorry, I'm taking a quick break to restock! Try again later.";

    return NextResponse.json({ message: responseContent });
  } catch (error: any) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
