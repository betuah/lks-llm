"use client";

import { useSession } from "next-auth/react";
import ApiStatus from "@/components/check/api-status";
import UserInfo from "@/components/check/user-info";

interface Endpoint {
   name: string;
   url: string;
   method: "GET" | "POST";
   body?: object;
}

const endpoints: Endpoint[] = [
   {
      name: "GET /us-east-1",
      url: "/us-east-1/tags",
      method: "GET",
   },
   {
      name: "POST /us-east-1",
      url: "/us-east-1/embed",
      method: "POST",
      body: {
         model: "nomic-embed-text",
         input: "Why is the sky blue?",
      },
   },
   {
      name: "GET /us-west-2",
      url: "/us-west-2/tags",
      method: "GET",
   },
   {
      name: "POST /us-west-2",
      url: "/us-west-2/embed",
      method: "POST",
      body: {
         model: "nomic-embed-text",
         input: "Why is the sky blue?",
      },
   },
   {
      name: "GET ALL Conversations",
      url: "/conversations",
      method: "GET",
   },
   {
      name: "POST Conversations",
      url: "/conversations",
      method: "POST",
      body: {
         id: "550e8400-e29b-41d4-a716-446655440000",
         userId: "048884b8-4001-7071-6476-7604cb9a12a2",
         title: "test",
         conversations: [{
            "role": "user",
            "content": "why is the sky blue?"
         }]
      }
   }
];


const Dashboard = () => {
   const { data: session, status } = useSession();

   if (status === "loading") {
      return <div className="flex items-center justify-center h-screen w-full">Loading...</div>;
   }

   return (
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-3xl mx-auto">
         <span className="font-bold text-3xl mt-10">Apps Status</span>

         <UserInfo 
            id={session?.user?.id}
            name={session?.user?.name}
            email={session?.user?.email}
            status={status}
            idToken={session?.user?.idToken}
         />

         <ApiStatus endpoints={endpoints} />
      </div>
   );
};

export default Dashboard;
