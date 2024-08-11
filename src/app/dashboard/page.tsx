"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
   const { data: session, status } = useSession();

   const router = useRouter();
   const sesData = session as any

   useEffect(() => {
      if (sesData?.user?.error === "RefreshAccessTokenError") {
         router.push("/signin");
      }
   }, [session]);

   if (status === "loading") {
      return <div className="flex items-center justify-center h-screen w-full">Loading...</div>;
   }

   return (
      <div className="flex flex-col gap-4 h-screen w-full max-w-3xl mx-auto">
         <div className="flex flex-col">
            Test
         </div>
      </div>
   );
};

export default Dashboard;
