import { assessLanguageSkills } from "/opt/languageAssessment.mjs";

export const handler = async (event) => {
   try {
      const apiKey = event.headers["x-api-key"];
      if (!apiKey) {
         return {
            statusCode: 401,
            body: JSON.stringify({ error: "Unauthorized: API Key missing" }),
         };
      }

      const chatData = JSON.parse(event.body || "{}");
      const result = await assessLanguageSkills(chatData);

      return {
         statusCode: 200,
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(result),
      };
   } catch (error) {
      console.error("Error:", error);
      return {
         statusCode: 500,
         body: JSON.stringify({ error: "An error occurred during assessment" }),
      };
   }
};
