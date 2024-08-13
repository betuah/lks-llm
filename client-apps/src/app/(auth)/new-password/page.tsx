'use client';

import {
   CognitoIdentityProviderClient,
   RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Span } from "next/dist/trace";

const signUpSchema = z
   .object({
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
      confirmPassword: z
         .string()
         .min(1, { message: "Confirm password is required" }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

type SignUpFormInputs = z.infer<typeof signUpSchema>;

const Signup = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [err, setErr] = useState<string>("");
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] =
      useState<boolean>(false);

   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      getValues,
   } = useForm<SignUpFormInputs>({
      resolver: zodResolver(signUpSchema),
   });

   const handleInputChange = (fieldName: keyof SignUpFormInputs) => {
      reset(
         { ...getValues(), [fieldName]: getValues(fieldName) },
         { keepValues: true, keepErrors: false }
      );
   };

   
   const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
      setIsLoading(true);
      setErr("");

      const client = new CognitoIdentityProviderClient({
         region: process.env.NEXT_PUBLIC_COGNITO_REGION,
      });

      const command = new RespondToAuthChallengeCommand({
         ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
         ChallengeName: "NEW_PASSWORD_REQUIRED",
         Session: new URLSearchParams(window.location.search).get('session') as string,
         ChallengeResponses: {
            NEW_PASSWORD: data.password,
            USERNAME: new URLSearchParams(window.location.search).get('username') as string,
         },
      });

      try {
         await client.send(command);
         const result = await signIn("cognito", {
            username: new URLSearchParams(window.location.search).get('username'),
            password: data.password,
            redirect: false,
         });
         if (result?.error) {
            console.error(result.error);
            setErr(result.error);
         } else {
            router.push("/"); 
         }
      } catch (error) {
         console.error("Error changing password:", error);
         setErr("Failed to change password. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex items-center justify-center h-screen w-full p-5">
         <div className="flex flex-col w-full max-w-md p-6 md:p-10 bg-accent shadow-2xl shadow-primary rounded-lg border border-primary opacity-0 animate-fade-in delay-200">
            <div className="grid gap-2 text-center mb-4">
               <h1 className="text-xl font-head font-bold tracking-widest opacity-0 animate-slide-down-fade-in delay-100">
                  Setup New Password
               </h1>
               <p className="text-[11px] text-muted-foreground opacity-0 animate-slide-up-fade-in delay-100">
                  Your new password must be different from previous used
                  passwords
               </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="mt-3 grid gap-4">
                  <div className="grid gap-2 opacity-0 animate-slide-right-fade-in delay-500">
                     <Label htmlFor="password">Password</Label>
                     <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        appendIcon={
                           showPassword ? (
                              <EyeOffIcon
                                 className="h-4 w-4 cursor-pointer"
                                 onClick={() => setShowPassword(!showPassword)}
                              />
                           ) : (
                              <EyeIcon
                                 className="h-4 w-4 cursor-pointer"
                                 onClick={() => setShowPassword(!showPassword)}
                              />
                           )
                        }
                        {...register("password", {
                           onChange: () => handleInputChange("password"),
                        })}
                        error={errors.password?.message}
                     />
                  </div>
                  <div className="grid gap-2 opacity-0 animate-slide-right-fade-in delay-700">
                     <Label htmlFor="password">Confirm Password</Label>
                     <Input
                        id="password"
                        type={showConfirmPassword ? "text" : "password"}
                        appendIcon={
                           showPassword ? (
                              <EyeOffIcon
                                 className="h-4 w-4 cursor-pointer"
                                 onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                 }
                              />
                           ) : (
                              <EyeIcon
                                 className="h-4 w-4 cursor-pointer"
                                 onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                 }
                              />
                           )
                        }
                        error={errors.confirmPassword?.message}
                        {...register("confirmPassword", {
                           onChange: () => handleInputChange("confirmPassword"),
                        })}
                     />
                  </div>
                  <Separator className="opacity-0 animate-fade-in delay-700" />
                  <Button
                     type="submit"
                     className="w-full text-primary-foreground opacity-0 animate-slide-left-fade-in delay-1000"
                     disabled={isLoading}
                  >
                     <span className={`${isLoading && "animate-pulse"}`}>{isLoading ? "Updating..." : "Set New Password"}</span>
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Signup;
