import { auth } from "@/auth";
import type { AssessmentScores, VercelChatMessage } from "./types";

const getOllamaUrl = (endpoint: string, region: string): string => {
   if (process.env.MODE === "development") {
      return `http://localhost:11434/api/${endpoint}`;
   } else {
      const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
      return `${baseUrl}/${region}/${endpoint}`;
   }
};

export const ASPECT_REFERENCES = {
   written_fluency: "Smooth and effortless expression of ideas in writing",
   vocabulary: "Wide range of appropriate and sophisticated words",
   grammar: "Correct use of complex grammatical structures",
   comprehension: "Full understanding and appropriate responses",
   coherence: "Logically organized and clearly expressed ideas",
   digital_etiquette:
      "Proper use of punctuation, capitalization, and chat conventions",
   responsiveness: "Timely and relevant replies to previous messages",
   clarity: "Clear and unambiguous expression of thoughts",
   overall_communication: "Effective overall written communication skills",
};

export const formatConversation = (messages: VercelChatMessage[]): string => {
   return messages
      .map((msg) => {
         if (msg.role === "assistant") {
            const content = msg.content.split("\n\n**Notes:**")[0].trim(); // Remove notes section
            return `Assistant: ${content}`;
         }
         return `${msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}: ${
            msg.content
         }`;
      })
      .join("\n\n");
};

export const getEmbedding = async (
   text: string,
   region: string,
   model: string
): Promise<number[]> => {
   const session = await auth();
   const token = session?.user?.idToken

   const url = getOllamaUrl("embeddings", region);
   const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ model, prompt: text }),
   });

   if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
   }

   const data = await response.json();
   return data.embedding;
};

export const llmQuery = async (
   prompt: string,
   region: string,
   model: string
): Promise<string> => {
   const session = await auth();
   const token = session?.user?.idToken

   const url = getOllamaUrl("generate", region);
   const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
         model,
         prompt,
         stream: false,
         options: { temperature: 0.3, top_p: 0.95 },
      }),
   });

   if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
   }

   const data = await response.json();

   if (data?.error) {
      throw new Error(data.error);
   }

   return data.response;
};

export const extractJSONFromString = (str: string): any => {
   const jsonMatch = str.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
      throw new Error("Failed to extract JSON from string");
   }
   return JSON.parse(jsonMatch[0]);
};

export const validateAssessmentScores = (
   scores: any
): asserts scores is AssessmentScores => {
   const requiredKeys = [
      "written_fluency",
      "vocabulary",
      "grammar",
      "comprehension",
      "coherence",
      "turn_taking",
      "idiomatic_expressions",
      "digital_etiquette",
      "responsiveness",
      "clarity",
      "adaptability",
      "asking_questions",
      "overall_communication",
   ];

   for (const key of requiredKeys) {
      if (
         typeof scores[key] !== "number" ||
         scores[key] < 0 ||
         scores[key] > 10
      ) {
         throw new Error(
            `Invalid score for ${key}: must be a number between 0 and 10`
         );
      }
   }
};
