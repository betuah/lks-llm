'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
   const { data: session, status } = useSession();
   const sesData = session as any;
   const router = useRouter();

   useEffect(() => {
      if (
         status === "authenticated" &&
         sesData?.error === "RefreshAccessTokenError"
      ) {
         // Redirect to login page if refresh token is expired
         router.push("/signin");
      }
   }, [session, status, router]);

   return <>{children}</>;
}
