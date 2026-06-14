import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const { ingredients } = await req.json();

    const systemInstruction = `
You are a witty, health-conscious AI nutritionist for a Lahore-based food truck called Chatak Patak (popular with DHA crowd).
A user has built a custom bowl with the following ingredients:
${ingredients.join(", ")}

Estimate the rough nutritional breakdown for a standard food-truck serving size of this bowl.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const prompt = `
Respond ONLY with a valid JSON object in the exact following schema format:
{
  "calories": 450,
  "protein": "15g",
  "carbs": "40g",
  "fats": "20g",
  "message": "A fun, short (2 sentences max) message about this bowl's health profile, using terms the health-conscious DHA crowd would appreciate (e.g. 'macros', 'clean eating', 'cheat meal')."
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const responseContent = result.response.text() || "{}";
    const parsedResult = JSON.parse(responseContent);

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Error generating nutrition info:", error);
    return NextResponse.json(
      { error: "Failed to generate nutrition info" },
      { status: 500 }
    );
  }
}
