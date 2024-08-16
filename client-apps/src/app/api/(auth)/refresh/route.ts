import { NextRequest, NextResponse } from "next/server";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { refreshAccessToken } from "@/lib/cognito";
import {
   getRefreshTokenFromCookie,
   setRefreshTokenCookie,
} from "@/lib/cookies";

interface RefreshTokenResult {
   accessToken: string;
   expiresIn: number;
   idToken: string;
}

export async function POST(request: NextRequest) {
   const refreshToken = await getRefreshTokenFromCookie();

   if (!refreshToken) {
      return NextResponse.json(
         { error: "No refresh token found" },
         { status: 401 }
      );
   }

   try {
      const response: RefreshTokenResult = await refreshAccessToken(refreshToken);

      return NextResponse.json(
         {
            accessToken: response.accessToken,
         },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: (error as Error).message },
         { status: 400 }
      );
   }
}
