import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "../../lib/products";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const { answers } = await req.json();

    const systemInstruction = `
You are a fun, witty AI for a Lahore-based food truck called Chatak Patak (popular with UCP students).
A user has just taken a personality quiz with the following answers:
${answers.map((a: any, i: number) => `Q${i+1}: ${a.question}\nA: ${a.answer}`).join("\n")}

Based on these answers, assign them one of the following menu items that best matches their personality vibe.

Available Menu Items:
${products.filter(p => p.category === 'bowls').map(p => `- ${p.name} (ID: ${p.id}): ${p.description}`).join("\n")}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const prompt = `
Respond ONLY with a valid JSON object in the exact following schema format:
{
  "productId": "the-id-of-the-product",
  "personalityLabel": "A fun label like 'You're a Spicy Volcano — chaotic good energy'",
  "description": "A 2-3 sentence funny description explaining why they got this bowl, using UCP student slang/vibes."
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    });

    const responseContent = result.response.text() || "{}";
    const parsedResult = JSON.parse(responseContent);

    const productExists = products.find(p => p.id === parsedResult.productId);
    if (!productExists) {
        parsedResult.productId = "spicy-volcano";
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Error generating quiz result:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz result" },
      { status: 500 }
    );
  }
}
