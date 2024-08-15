import type { AssessmentScores, VercelChatMessage } from "./types";

const getOllamaUrl = (endpoint: string, region: string): string => {
   if (process.env.MODE === "development") {
      return `http://localhost:11434/api/${endpoint}`;
   } else {
      const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
      return `${baseUrl}/${region}/${endpoint}`;
   }
}

export const ASPECT_REFERENCES = {
   written_fluency: "Smooth and effortless expression of ideas in writing",
   vocabulary: "Wide range of appropriate and sophisticated words",
   grammar: "Correct use of complex grammatical structures",
   comprehension: "Full understanding and appropriate responses",
   coherence: "Logically organized and clearly expressed ideas",
   turn_taking: "Natural flow in conversation with appropriate turn-taking",
   idiomatic_expressions: "Proper use of idioms and colloquial expressions",
   digital_etiquette: "Proper use of punctuation, capitalization, and chat conventions",
   responsiveness: "Timely and relevant replies to previous messages",
   clarity: "Clear and unambiguous expression of thoughts",
   adaptability: "Adjusting language and tone to different topics or contexts",
   asking_questions: "Asking relevant and engaging questions to maintain conversation",
   overall_communication: "Effective overall written communication skills",
};

export const formatConversation = (messages: VercelChatMessage[]): string => {
   return messages
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n");
}

export const getEmbedding = async (
   text: string,
   region: string,
   model: string
): Promise<number[]> => {
   const url = getOllamaUrl("embeddings", region);
   const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt: text }),
   });

   if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
   }

   const data = await response.json();
   return data.embedding;
}

export const llmQuery = async (
   prompt: string,
   region: string,
   model: string
): Promise<string> => {
   const url = getOllamaUrl("generate", region);
   const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
   return data.response;
}

export const extractJSONFromString = (str: string): any => {
   const jsonMatch = str.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
      throw new Error("Failed to extract JSON from string");
   }
   return JSON.parse(jsonMatch[0]);
}

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
}
