import { NextRequest, NextResponse } from "next/server";
import {
   CognitoIdentityProviderClient,
   GetUserCommand,
   InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {
   getRefreshTokenFromCookie,
   setRefreshTokenCookie,
} from "@/lib/cookies";

const cognitoClient = new CognitoIdentityProviderClient({
   region: process.env.AWS_REGION,
});

async function refreshAccessToken(refreshToken: string) {
   try {
      const command = new InitiateAuthCommand({
         AuthFlow: "REFRESH_TOKEN_AUTH",
         ClientId: process.env.COGNITO_CLIENT_ID!,
         AuthParameters: {
            REFRESH_TOKEN: refreshToken,
         },
      });

      const response = await cognitoClient.send(command);
      return response.AuthenticationResult?.AccessToken;
   } catch (error) {
      console.error("Refresh token error:", error);
      return null;
   }
}

async function getUserInfo(accessToken: string) {
   const command = new GetUserCommand({
      AccessToken: accessToken,
   });

   const response = await cognitoClient.send(command);

   const name =
      response.UserAttributes?.find((attr) => attr.Name === "name")?.Value ||
      "";
   const email =
      response.UserAttributes?.find((attr) => attr.Name === "email")?.Value ||
      "";
   const id = response.UserAttributes?.find((attr) => attr.Name === "sub")?.Value || "";

   return { name, email, id };
}

export async function GET(request: NextRequest) {
   let accessToken = request.headers.get("Authorization")?.split(" ")[1];

   if (!accessToken) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
   }

   try {
      const userInfo = await getUserInfo(accessToken);
      return NextResponse.json({
         isAuthenticated: true,
         user: userInfo,
      });
   } catch (error) {
      console.error("Check auth error:", error);

      // If the access token is invalid, try to refresh it
      const refreshToken = await getRefreshTokenFromCookie();
      if (refreshToken) {
         const newAccessToken = await refreshAccessToken(refreshToken);
         if (newAccessToken) {
            // If refresh is successful, get user info with new access token
            try {
               const userInfo = await getUserInfo(newAccessToken);

               // Create the response
               const response = NextResponse.json({
                  isAuthenticated: true,
                  user: userInfo,
                  accessToken: newAccessToken, // Optionally return the new access token
               });

               // Optionally set a new refresh token cookie if it was returned
               // You might need to adjust this based on your Cognito configuration
               if (refreshToken !== (await getRefreshTokenFromCookie())) {
                  await setRefreshTokenCookie(refreshToken);
               }

               return response;
            } catch (error) {
               console.error("Error getting user info after refresh:", error);
            }
         }
      }

      // If refresh fails or there's no refresh token, return not authenticated
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
   }
}
