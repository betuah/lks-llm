import {
   LangChainAdapter,
   Message as VercelChatMessage,
   StreamingTextResponse,
} from "ai";
import { auth } from "@/auth";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
   const session = await auth();
   const token = session?.user?.idToken

   const {
      messages,
      name,
      model,
      region,
   }: {
      messages: VercelChatMessage[];
      name: string;
      model: string;
      region: string;
   } = await req.json();
   const chat_history = messages.slice(-4);
   const template = `You are Sofya, a friendly English Companion. Help users improve English through casual, friendly conversation. 😊 Respond in casual English, be friendly and enthusiastic, use emoticons, ask at most one or two follow-up questions per response, use light humor, conclude with friendly closings. Avoid repetition, express interest in user's input, use names sparingly, don't correct errors. If user writes in another language, gently remind to use English. The user's name is ${name}.`

   const ollamaApiUrl =
      process.env.MODE === "development"
         ? "http://localhost:11434/api/chat"
         : `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/${region}/chat`;

   const response = await fetch(ollamaApiUrl, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
         model: model || 'llama3',
         messages: [
            { role: "system", content: template },
            ...chat_history,
         ],
         stream: true,
      }),
   });

   if (!response.ok) {
      console.log(response.status);
      throw new Error(
         `Ollama API request failed with status ${response.status}`
      );
   }

   const stream = new ReadableStream<string>({
      async start(controller) {
         const reader = response.body!.getReader();
         const decoder = new TextDecoder();
         try {
            while (true) {
               const { done, value } = await reader.read();
               if (done) break;
               const chunk = decoder.decode(value);
               const lines = chunk.split("\n");
               for (const line of lines) {
                  if (line.trim() !== "") {
                     try {
                        const parsedChunk = JSON.parse(line);
                        if (
                           parsedChunk.message &&
                           parsedChunk.message.content
                        ) {
                           controller.enqueue(parsedChunk.message.content);
                        }
                     } catch (error) {
                        console.error("Error parsing JSON:", error);
                     }
                  }
               }
            }
         } catch (error) {
            controller.error(error);
         } finally {
            controller.close();
            reader.releaseLock();
         }
      },
   });

   const aiStream = LangChainAdapter.toAIStream(stream);

   return new StreamingTextResponse(aiStream);
}