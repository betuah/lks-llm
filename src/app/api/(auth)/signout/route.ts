import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/lib/cognito";
import { clearRefreshTokenCookie } from "@/lib/cookies";
import { ResponseBody } from "@/lib/response";

export async function POST(request: NextRequest) {
   // Get the access token from the request headers
   const authHeader = request.headers.get("Authorization");
   const accessToken = authHeader?.split(" ")[1];

   if (accessToken) {
      await signOut(accessToken);
   } else {
      console.warn("No access token provided for Cognito sign out");
   }

   // Clear the refresh token cookie
   clearRefreshTokenCookie();

   return ResponseBody(
      { status: "success" , message: "Signed out successfully" },
      200
   );
}