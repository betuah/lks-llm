import { NextRequest, NextResponse } from "next/server";
import { signIn, getUserInfo } from "@/lib/cognito";
import { setRefreshTokenCookie } from "@/lib/cookies";
import { ResponseBody } from "@/lib/response";

export async function POST(request: NextRequest) {
   const { email, password } = await request.json();

   try {
      const response = await signIn(email, password);
      const refreshToken = response.RefreshToken;
      const accessToken = response.AccessToken;

      console.log('zxczsdaw', response)

      if (!refreshToken || !accessToken) {
         throw new Error("Failed to get refresh token or access token");
      }

      const user = await getUserInfo(accessToken);
      await setRefreshTokenCookie(refreshToken);

      const rawBody = {
         status: "success",
         message: "User logged in successfully",
         data: {
            user,
            accessToken,
         }
      }

      return ResponseBody(rawBody, 200);
   } catch (error) {
      if (error instanceof Error) {
         return ResponseBody({
            status: "error",
            message: error.message,
         }, 400)
      }

      return ResponseBody({
         status: "error",
         message: "Internal server error",
      }, 500)
   }
}
