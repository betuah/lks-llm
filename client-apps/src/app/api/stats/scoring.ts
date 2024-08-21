import type { AssessmentScores } from "./types";
import { getEmbedding, llmQuery } from "./utils";

export const scoringWithPrompt = async(
   conversation: string,
   region: string,
   model: string,
): Promise<AssessmentScores> => {
   const prompt = `
As an expert English language assessor, evaluate the following conversation.  
Provide scores (0-100) for these aspects of the user's English language skills:

1. Written Fluency
2. Vocabulary
3. Grammar
4. Comprehension
5. Coherence
6. Digital Etiquette
7. Responsiveness
8. Clarity
9. Overall Communication

Conversation:
${conversation}

Respond with a JSON object containing only the scores for user. Ensure all scores are integers between 0 and 100.
`;

   const response = await llmQuery(prompt, region, model);
   const jsonMatch = response.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Ollama response");
   }

   return JSON.parse(jsonMatch[0]) as AssessmentScores;
}

export const scoringWithHybrid = async (
   conversation: string,
   region: string,
   model: string
): Promise<AssessmentScores> => {
   const embedding = await getEmbedding(conversation, region, model);
   const prompt = `
As an expert English language assessor, evaluate the following conversation and its embedding representation. 
Provide scores (0-100) for these aspects:

1. Written Fluency
2. Vocabulary
3. Grammar
4. Comprehension
5. Coherence
6. Digital Etiquette
7. Responsiveness
8. Clarity
9. Overall Communication

Conversation Embedding:
${embedding.join(", ")}

Consider both the textual content and the embedding representation in your assessment.
Respond with a JSON object containing only the scores. Ensure all scores are integers between 0 and 100.
`;

   const response = await llmQuery(prompt, region, model);
   const jsonMatch = response.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Ollama response");
   }

   return JSON.parse(jsonMatch[0]) as AssessmentScores;
}
