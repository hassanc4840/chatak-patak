import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "../../lib/products";

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    // Initialize Gemini SDK with the key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const { messages } = await req.json();

    // Map the incoming messages (role: "user" | "assistant") to Gemini's format (role: "user" | "model")
    const mappedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    
    // Gemini strictly requires the history array to start with a 'user' message,
    // and MUST strictly alternate between 'user' and 'model'.
    const geminiHistory: any[] = [];
    
    // Start from the end to ensure we keep the most recent context
    let expectedRole = "model";
    for (let i = mappedHistory.length - 1; i >= 0; i--) {
      if (mappedHistory[i].role === expectedRole) {
        geminiHistory.unshift(mappedHistory[i]);
        expectedRole = expectedRole === "model" ? "user" : "model";
      }
    }

    // Since we need to start with 'user', if the first message in our alternating array is 'model', we drop it.
    if (geminiHistory.length > 0 && geminiHistory[0].role === "model") {
      geminiHistory.shift();
    }

    // The latest message from the user
    const latestMessage = messages[messages.length - 1].content;

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

    // Use gemini-flash-latest to automatically use the best available stable flash model
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction,
    });

    // Start a chat session with history
    const chatSession = model.startChat({
      history: geminiHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });

    const result = await chatSession.sendMessage(latestMessage);
    const responseContent = result.response.text() || "Sorry, I'm taking a quick break to restock! Try again later.";

    return NextResponse.json({ message: responseContent });
  } catch (error: any) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
