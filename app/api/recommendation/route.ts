import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "../../lib/products";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    // Fetch weather for Lahore
    const weatherRes = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current=temperature_2m,is_day,precipitation,weather_code",
      { next: { revalidate: 3600 } }
    );
    const weatherData = await weatherRes.json();
    
    const current = weatherData.current;
    const temp = current.temperature_2m;
    const isDay = current.is_day;
    const precip = current.precipitation;
    
    let weatherContext = `It is currently ${temp}°C in Lahore. `;
    if (precip > 0) weatherContext += "It is raining. ";
    else if (temp > 35) weatherContext += "It is a hot summer day. ";
    else if (temp < 15) weatherContext += "It is a cold winter day. ";
    
    weatherContext += isDay ? "It is daytime." : "It is nighttime.";

    const systemInstruction = `
You are an AI assistant for a hip, student-focused food truck in Lahore called Chatak Patak (UCP students).
Based on the following weather context, pick ONE most suitable item from our menu.

Weather Context: ${weatherContext}

Available Menu Items:
${products.map(p => `- ${p.name} (ID: ${p.id}): ${p.description}`).join("\n")}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const prompt = `
Respond ONLY with a valid JSON object in the exact following schema format:
{
  "productId": "the-id-of-the-product",
  "suggestionText": "A fun, short (2 sentences max) suggestion text tailored to UCP students mentioning the weather and why this item is perfect right now."
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

    // Validate productId exists
    const productExists = products.find(p => p.id === parsedResult.productId);
    if (!productExists) {
        return NextResponse.json({
            productId: "spicy-volcano",
            suggestionText: "Always a good time for a Dhamaka. It's the Spicy Volcano!"
        });
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
