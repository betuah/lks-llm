import type { AssessmentScores } from "./types";
import { getEmbedding, llmQuery } from "./utils";

export const scoringWithPrompt = async(
   conversation: string,
   region: string,
   model: string
): Promise<AssessmentScores> => {
   const prompt = `
As an expert English language assessor, evaluate the following conversation. 
Provide scores (0-10) for these aspects:

1. Written Fluency
2. Vocabulary
3. Grammar
4. Comprehension
5. Coherence
6. Turn-taking
7. Idiomatic Expressions
8. Digital Etiquette
9. Responsiveness
10. Clarity
11. Adaptability
12. Asking Questions
13. Overall Communication

Conversation:
${conversation}

Respond with a JSON object containing only the scores. Ensure all scores are integers between 0 and 10.
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
Provide scores (0-10) for these aspects:

1. Written Fluency
2. Vocabulary
3. Grammar
4. Comprehension
5. Coherence
6. Turn-taking
7. Idiomatic Expressions
8. Digital Etiquette
9. Responsiveness
10. Clarity
11. Adaptability
12. Asking Questions
13. Overall Communication

Conversation:
${conversation}

Conversation Embedding (first 10 values):
${embedding.slice(0, 10).join(", ")}...

Consider both the textual content and the embedding representation in your assessment.
Respond with a JSON object containing only the scores. Ensure all scores are integers between 0 and 10.
`;

   const response = await llmQuery(prompt, region, model);
   const jsonMatch = response.match(/\{[\s\S]*\}/);
   if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Ollama response");
   }

   return JSON.parse(jsonMatch[0]) as AssessmentScores;
}
