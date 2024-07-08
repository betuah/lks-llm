import { ollama_url } from "@/config/env";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const OLLAMA_URL = ollama_url || "http://localhost:11434";
  const res = await fetch(
    OLLAMA_URL + "/api/tags"
  );
  return new Response(res.body, res);
}
