import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

export function getGemini(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your environment variables.");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export async function generateContent(prompt: string, model: string = "gemini-3-flash-preview") {
  try {
    const ai = getGemini();
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });
    
    if (!response.text) {
      throw new Error("AI returned an empty response. This might be due to safety filters or a temporary glitch.");
    }
    
    return response.text;
  } catch (error) {
    console.error("Gemini Content Generation Error:", error);
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("Invalid or missing API key. Please contact support or check your configuration.");
      }
      if (error.message.includes("quota")) {
        throw new Error("Request limit reached. Please try again in a few minutes.");
      }
      throw error;
    }
    throw new Error("An unexpected error occurred during content generation.");
  }
}

export async function generateStructuredContent(prompt: string, model: string = "gemini-3-flash-preview") {
  try {
    const ai = getGemini();
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    
    if (!response.text) {
      throw new Error("AI returned an empty structured response.");
    }
    
    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini", e);
      throw new Error("The AI generated an invalid data format. Please try refining your request.");
    }
  } catch (error) {
    console.error("Gemini Structured Content Generation Error:", error);
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred during structured content generation.");
  }
}
