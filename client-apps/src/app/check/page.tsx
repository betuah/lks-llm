"use client";

import { useSession } from "next-auth/react";
import ApiStatus from "@/components/check/api-status";
import UserInfo from "@/components/check/user-info";
// import LLMStatus from "@/components/check/llm-status";

interface Endpoint {
   name: string;
   url: string;
   method: "GET" | "POST" | "PUT" | "DELETE";
   body?: object;
}

const Dashboard = () => {
   const { data: session, status } = useSession();
   const userData = session?.user as any;
   const uid = userData?.id;

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
         url: `/conversations/${uid}`,
         method: "GET",
      },
      {
         name: "POST Conversations",
         url: `/conversations/${uid}`,
         method: "POST",
         body: {
            id: "550e8400-e29b-41d4-a716-446655440000",
            title: "test",
            conversation: [{
               "role": "user",
               "content": "why is the sky blue?"
            }]
         }
      },
      {
         name: "GET Conversations Details",
         url: `/conversations/${uid}/550e8400-e29b-41d4-a716-446655440000`,
         method: "GET",
      },
      {
         name: "PUT Update Conversations",
         url: `/conversations/${uid}/550e8400-e29b-41d4-a716-446655440000`,
         method: "PUT",
         body: {
            userId: "048884b8-4001-7071-6476-7604cb9a12a2",
            title: "test",
            conversation: [{
               "role": "user",
               "content": "why is the sky blue?"
            }]
         }
      },
      {
         name: "DELETE Conversations by ID",
         url: `/conversations/${uid}/550e8400-e29b-41d4-a716-446655440000`,
         method: "DELETE",
      },
   ];

   if (status === "loading") {
      return <div className="flex items-center justify-center h-screen w-full">Loading...</div>;
   }

   return (
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-3xl mx-auto py-16">
         <span className="font-bold text-3xl">Apps Status</span>

         <UserInfo 
            id={session?.user?.id}
            name={session?.user?.name}
            email={session?.user?.email}
            status={status}
            idToken={session?.user?.idToken}
         />

         <ApiStatus endpoints={endpoints} />
         {/* <LLMStatus /> */}
      </div>
   );
};

export default Dashboard;
