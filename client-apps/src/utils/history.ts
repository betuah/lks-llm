// src/lib/history.ts

import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { VectorStoreRetrieverMemory } from "langchain/memory";
import { Message as VercelChatMessage } from "ai";
import { ollama_url } from "@/config/env";

let memory: VectorStoreRetrieverMemory | null = null;

async function initMemory() {
   if (!memory) {
      const embeddings = new OllamaEmbeddings({
         model: "llama3",
         baseUrl: ollama_url,
      });
      const vectorStore = new MemoryVectorStore(embeddings);
      memory = new VectorStoreRetrieverMemory({
         vectorStoreRetriever: vectorStore.asRetriever(2),
         inputKey: "input",
         memoryKey: "chat_history",
      });
   }
   return memory;
}

export async function saveMessages(messages: VercelChatMessage[]) {
   const mem = await initMemory();
   for (let i = 0; i < messages.length - 1; i += 2) {
      await mem.saveContext(
         { input: messages[i].content },
         { output: messages[i + 1].content }
      );
   }
}

export async function getRelevantHistory(currentMessage: string) {
   const mem = await initMemory();
   const relevantHistory = await mem.loadMemoryVariables({
      input: currentMessage,
   });
   return relevantHistory.chat_history;
}

export async function clearHistory() {
   memory = null;
   await initMemory();
}
