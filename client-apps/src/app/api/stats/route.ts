import { NextRequest, NextResponse } from 'next/server';
import { VercelChatMessage, ScoringReult } from './types';
import { formatConversation } from './utils';
import { scoringWithPrompt } from './scoring';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
   try {
      const { conversations, region, model }: { conversations: VercelChatMessage[], region: string, model: string } = await req.json();
      const conversationText = formatConversation(conversations);

      const start = Date.now();
      const hybridScores = await scoringWithPrompt(conversationText, region, model);
      const duration = Date.now() - start;

      const result: ScoringReult = {
         status: "success",
         message: "Assessment comparison completed successfully",
         duration_ms: duration,
         data: hybridScores
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