import { NextRequest, NextResponse } from "next/server";
import { ForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/lib/cognito";

export async function POST(request: NextRequest) {
   const { username } = await request.json();

   const command = new ForgotPasswordCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
   });

   try {
      await cognitoClient.send(command);
      return NextResponse.json(
         { message: "Password reset instructions sent" },
         { status: 200 }
      );
   } catch (error) {
      return NextResponse.json(
         { error: (error as Error).message },
         { status: 400 }
      );
   }
}
