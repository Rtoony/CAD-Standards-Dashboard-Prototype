import { GoogleGenAI } from "@google/genai";

// We will use this to generate "Lore" or "Technical Fluff" for the selected category
// if an API key is available.
export const generateCategoryLore = async (categoryName: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "System Offline. Connect API Key to retrieve archive data.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, cryptic, steampunk-style system initialization log (max 2 sentences) for a CAD library module named "${categoryName}". Use words like "cogitation", "pressure", "steam", "flux".`,
    });
    return response.text || "Data corrupted.";
  } catch (error) {
    console.error("Gemini Error", error);
    return "Connection to mainframe interrupted.";
  }
};