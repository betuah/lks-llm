import { pipeline } from "./node_modules/@xenova/transformers";
import { cosineSimilarity } from "./node_modules/ml-distance";

const referenceEmbeddings = {
   beginner: Array(384)
      .fill(0)
      .map(() => Math.random()),
   intermediate: Array(384)
      .fill(0)
      .map(() => Math.random()),
   advanced: Array(384)
      .fill(0)
      .map(() => Math.random()),
};

async function getEmbedding(text) {
   const embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
   );
   const result = await embedder(text, { pooling: "mean", normalize: true });
   return Array.from(result.data);
}

function calculateScore(similarity) {
   return Math.round(similarity * 100);
}

function determineEnglishLevel(overallScore) {
   if (overallScore < 40) return "Beginner";
   if (overallScore < 70) return "Intermediate";
   return "Advanced";
}

export async function assessLanguageSkills(chatData) {
   const userText = chatData.messages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content)
      .join(" ");

   const embedding = await getEmbedding(userText);

   const similarities = {
      beginner: cosineSimilarity(embedding, referenceEmbeddings.beginner),
      intermediate: cosineSimilarity(
         embedding,
         referenceEmbeddings.intermediate
      ),
      advanced: cosineSimilarity(embedding, referenceEmbeddings.advanced),
   };

   const proficiencyLevel = Object.entries(similarities).reduce((a, b) =>
      a[1] > b[1] ? a : b
   )[0];
   const similarity = similarities[proficiencyLevel];

   const score = calculateScore(similarity);

   const assessment = {
      speaking: score,
      listening: score,
      reading: score,
      writing: score,
      grammar: score,
      vocabulary: score,
      pronunciation: score,
      fluency: score,
      comprehension: score,
      overall_score: score,
      english_level: determineEnglishLevel(score),
   };

   const tokenCount = userText.split(/\s+/).length;

   return {
      assessment,
      usage: {
         completion_tokens: tokenCount,
         prompt_tokens: tokenCount,
         total_tokens: tokenCount * 2,
      },
   };
}
