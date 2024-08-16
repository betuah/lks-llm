"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOffIcon, CircleX } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const signInSchema = z.object({
   email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
   password: z.string().min(1, { message: "Password is required" }),
});

type SignInFormInputs = z.infer<typeof signInSchema>;

const Signin = () => {
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");
   const router = useRouter();
   const searchParams = useSearchParams();
   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors },
   } = useForm<SignInFormInputs>({ resolver: zodResolver(signInSchema) });

   const onSubmit: SubmitHandler<SignInFormInputs> = async (data, e) => {
      setIsLoading(true);
      setError("");

      try {
         const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
         });

         if (result?.error) {
            setError("Invalid email or password");
         } else {
            const redirectParas = searchParams.get("redirectTo");
            const redirectTo = redirectParas || "/";
            router.push(redirectTo);
         }
      } catch (error) {
         setError((error as Error).message);
      } finally {
         setIsLoading(false);
      }
   };

   const handleInputChange = (fieldName: keyof SignInFormInputs) => {
      reset(
         { ...getValues(), [fieldName]: getValues() },
         { keepValues: true, keepErrors: false }
      );
   };

   return (
      <div className="flex items-center justify-center h-screen w-full mx-auto p-5">
         <div className="flex flex-col w-full max-w-md p-6 md:p-10 bg-accent shadow-2xl shadow-primary rounded-lg border border-primary opacity-0 animate-fade-in delay-200">
            <div className="grid gap-2 text-center mb-4">
               <h1 className="text-3xl md:text-4xl font-head font-bold tracking-widest animate-slide-down-fade-in delay-100">
                  SignIn
               </h1>
               <p className="text-[11px] md:text-xs text-muted-foreground opacity-0 animate-slide-up-fade-in delay-100">
                  Hi, welcome back! Please sign in to continue.
               </p>
            </div>

            {error && (
               <div className="flex items-center w-full mb-4 gap-3 border border-dashed border-rose-400 rounded-sm px-3 py-2 bg-rose-400/10">
                  <CircleX className="w-5 h-5 text-muted-foreground text-rose-400" />
                  <div className="flex flex-col gap-1">
                     <span className="text-sm font-bold text-rose-400">
                        Error
                     </span>
                     <p className="text-[11px] text-rose-400">{error}</p>
                  </div>
               </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="mt-3 grid gap-4">
                  <div className="grid gap-2 opacity-0 animate-slide-right-fade-in delay-300">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="me@example.com"
                        error={errors.email?.message}
                        {...register("email", {
                           onChange: () => handleInputChange("email"),
                        })}
                     />
                  </div>
                  <div className="grid gap-2 opacity-0 animate-slide-left-fade-in delay-300">
                     <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                           href="/forgot-password"
                           className="ml-auto inline-block text-xs hover-underline"
                        >
                           Forgot your password?
                        </Link>
                     </div>
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
                           required: "Password is required",
                        })}
                        {...register("password", {
                           onChange: () => handleInputChange("password"),
                        })}
                        error={errors.password?.message}
                     />
                  </div>
                  <Separator className="opacity-0 animate-fade-in delay-150" />
                  <div className="opacity-0 animate-slide-down-fade-in delay-500">
                     <Button
                        type="submit"
                        variant={"default"}
                        className="w-full text-primary-foreground"
                        disabled={isLoading}
                     >
                        <span className={`${isLoading && "animate-pulse"}`}>
                           {isLoading ? "Signing In..." : "Sign In"}
                        </span>
                     </Button>
                  </div>
               </div>
            </form>
            <div className="my-4 text-center text-xs opacity-0 animate-slide-up-fade-in delay-500">
               Don&apos;t have an account?
               <a
                  href="/signup"
                  className="font-bold text-primary hover-underline ml-1"
               >
                  Sign Up
               </a>
            </div>
         </div>
      </div>
   );
};

export default Signin;
