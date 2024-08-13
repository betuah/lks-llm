import { NextRequest, NextResponse } from "next/server";
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import cognitoClient from "@/lib/cognito";
import { z } from "zod";
import { ResponseBody } from "@/lib/response";

const signUpSchema = z.object({
   fullName: z.string().min(1, { message: "Full name is required" }),
   email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
   password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).*$/,
         {
            message:
               "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
         }
      ),
});

export async function POST(request: NextRequest) {
   try {
      const body = await request.json();
      const validatedData = signUpSchema.parse(body);
      const { fullName, email, password } = validatedData;

      const command = new SignUpCommand({
         ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
         Username: email,
         Password: password,
         UserAttributes: [
            {
               Name: "name",
               Value: fullName,
            },
            {
               Name: "email",
               Value: email,
            },
         ],
      });

      await cognitoClient.send(command);

      const resBody = {
         status: "success",
         message: "User created successfully",
      };

      return ResponseBody(resBody, 200);
   } catch (error) {
      if (error instanceof z.ZodError) {
         const errField: Record<string, string> = {};
         error.errors.forEach((err) => {
            errField[err.path.join(".")] = err.message;
         });
         return ResponseBody({ status: "error", message: "Validation error", errField }, 400);
      }

      const errBody = {
         status: "error",
         message: (error as Error).message,
      };

      return ResponseBody(errBody, 400);
   }
}
