import { NextRequest, NextResponse } from 'next/server';
import { VercelChatMessage, ScoringReult, AspectScore } from './types';
import { formatConversation, ASPECT_REFERENCES } from './utils';
import { scoringWithPrompt } from './scoring';
import { auth } from "@/auth";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
   try {
      const { conversations, region, model }: { conversations: VercelChatMessage[], region: string, model: string } = await req.json();
      const conversationText = formatConversation(conversations);

      const start = Date.now();
      const conversationScore = await scoringWithPrompt(conversationText, region, model);
      const duration = Date.now() - start;

      const formattedScores: AspectScore[] = Object.entries(conversationScore).map(([key, value]) => {
         const id = key.toLowerCase().replace(/ /g, '_');
         return {
            id,
            title: key,
            desc: ASPECT_REFERENCES[id as keyof typeof ASPECT_REFERENCES] || "",
            score: value
         };
      });

      const result: ScoringReult = {
         status: "success",
         message: "Assessment comparison completed successfully",
         duration_ms: duration,
         data: formattedScores
      };

      return NextResponse.json(result);
   } catch (error) {
      console.error("Assessment error:", error);
      return NextResponse.json({
         status: "error",
         message: error instanceof Error ? error.message : "An error occurred during assessment",
         data: null
      }, { status: 500 });
   }
}