import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const CORRECTION_TEMPLATE = `
You are a smart English teacher. Your goal is to analyze, correct, and provide feedback on the given English text. Please follow these guidelines carefully:

1. **Use casual Indonesian language for corrections and tips.** Only English terms should remain in English.

2. **Put all corrections in the "corrections" array.** Each item in the array should be a string explaining the mistake and providing the correct version, along with the reason. **Do not use JSON format inside this array.**

3. **Provide 1-2 tips for improving the user's English skills** in the "tips" array. Write these tips in casual Indonesian.

4. **End with a motivational statement in Indonesian** in the "closing" section.

Format output harus seperti ini dan tidak ada teks tambahan sebelum bagian "correction"::

**correction**:
- [Koreksi 1 dan penjelasannya]
- [Koreksi 2 dan penjelasannya]

**tips**:
- [Tip 1]
- [Tip 2]

[closing statement]

English Text: {input}
`;

const fixJsonResponse = (jsonString: string): string => {
   try {
      // Remove unecessary newline dan escape character
      let cleanedString = jsonString
         .replace(/\\n/g, "")
         .replace(/\\"/g, '"')
         .replace(/\\'/g, "'");

      // change quotes to double quotes
      cleanedString = cleanedString.replace(/'/g, '"');

      // Make sure object
      if (!cleanedString.startsWith("{")) {
         cleanedString = "{" + cleanedString;
      }
      if (!cleanedString.endsWith("}")) {
         cleanedString = cleanedString + "}";
      }

      // Try JSON parse
      JSON.parse(cleanedString);
      return cleanedString;
   } catch (error) {
      throw new Error("Tidak dapat memperbaiki JSON: " + error);
   }
};

export async function POST(req: Request) {
   const session = await auth();
   const token = session?.user?.idToken

   const { input, region }: { input: string; region: string } =
      await req.json();

   if (!input) {
      return NextResponse.json({ error: "Input is required" });
   }

   const ollamaApiUrl =
      process.env.MODE === "development"
         ? "http://localhost:11434/api/generate"
         : `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/${
              region || "us-east-1"
           }/generate`;

   const response = await fetch(ollamaApiUrl, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
         model: "llama3",
         prompt: CORRECTION_TEMPLATE.replace("{input}", input),
         stream: false,
      }),
   });

   if (!response.ok) {
      return NextResponse.json({
         error: "Generate Correction API request failed",
      });
   }

   const resData = await response.json();
   let correction;

   try {
      correction = JSON.parse(resData.response)
   } catch (error) {
      try {
         correction = fixJsonResponse(resData.response);
      } catch (error) {
         return NextResponse.json({ error: "Reponse is not valid JSON" });
      }
   }

   return NextResponse.json(resData.response);
}
