
import { GoogleGenAI, Type } from "@google/genai";
import { Worker } from "../types";

// Always use the process.env.API_KEY string directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getSmartMatchRecommendations(userQuery: string, workers: Worker[]) {
    try {
      const workerContext = workers.map(w => ({
        id: w.id,
        name: w.name,
        profession: w.profession,
        rating: w.rating,
        skills: w.skills,
        experience: w.experience
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the user query: "${userQuery}", recommend the best workers from the list: ${JSON.stringify(workerContext)}. Provide a short justification for each choice.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                workerId: { type: Type.STRING },
                justification: { type: Type.STRING }
              },
              required: ["workerId", "justification"]
            }
          }
        }
      });

      // Use .text property directly and handle potential undefined
      const text = response.text?.trim();
      return text ? JSON.parse(text) : [];
    } catch (error) {
      console.error("Gemini Recommendation Error:", error);
      return [];
    }
  },

  async summarizeWorkerReviews(worker: Worker) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the professional reputation of ${worker.name}, who is a ${worker.profession} with ${worker.rating} rating and ${worker.reviewCount} reviews.`,
      });
      // Use .text property directly
      return response.text || "Excellent worker with great reputation.";
    } catch (error) {
      console.error("Gemini Summary Error:", error);
      return "Excellent worker with great reputation.";
    }
  }
};
