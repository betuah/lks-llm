import { Suspense } from "react";
import SignInForm from "@/components/signin-form";

export default function SignInPage() {
   return (
      <div className="flex items-center justify-center h-screen w-full mx-auto p-5">
         <Suspense fallback={<div className="h-screen w-full flex justify-center items-center text-xs text-primary">Loading...</div>}>
            <SignInForm />
         </Suspense>
      </div>
   );
}
