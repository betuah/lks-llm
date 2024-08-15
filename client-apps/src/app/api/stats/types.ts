import { Message as VercelChatMessage } from "ai";

export interface AssessmentScores {
   written_fluency: number;
   vocabulary: number;
   grammar: number;
   comprehension: number;
   coherence: number;
   turn_taking: number;
   idiomatic_expressions: number;
   digital_etiquette: number;
   responsiveness: number;
   clarity: number;
   adaptability: number;
   asking_questions: number;
   overall_communication: number;
}

export interface AssessmentResult {
   status: string;
   message: string;
   duration_ms: number;
   data: {
      prompt: AssessmentScores;
      hybrid: AssessmentScores;
   };
}

export interface ScoringReult {
   status: string;
   message: string;
   duration_ms: number;
   data: AspectScore[];
}

export type AspectScore = {
   id: string;
   title: string;
   desc: string;
   score: number;
};

export type { VercelChatMessage };
