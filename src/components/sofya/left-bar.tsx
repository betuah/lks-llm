import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ChevronLeft, Pencil } from "lucide-react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserSettings from "./user-settings";

const dummyData = [
   {
      id: "asdasd-asdxczx-asdw",
      title: "Topic 1",
   },
   {
      id: "asdasd-asdxczx-asdw2",
      title: "Topic 2",
   },
];

interface ConversationTypes {
   id: string;
   title: string;
}

interface PropsTypes {
   uid: string;
}

const LeftBar: React.FC<PropsTypes> = ({ uid }) => {
   const router = useRouter();
   const [conversations, setConversations] = useState<ConversationTypes[]>([]);
   const [isLoading, setIsloading] = useState<boolean>(false);
   const [error, setError] = useState<boolean>(false);

   const fetchConversations = async () => {
      setIsloading(true);
      setError(false);
      try {
         const response = await api.get(`/conversations/${uid}`);
         setConversations(response.data);
      } catch (error) {
         setError(true);
      } finally {
         setIsloading(false);
      }
   };

   // const updateTitle = async (id: string, title: string) => {
   //    try {
   //       await api.put(`/api/conversations/${uid}/${id}`, { title });
   //       fetchConversations();
   //    } catch (error) {
   //       setError(true);
   //    }
   // };

   // const deleteConversation = async (id: string) => {
   //    try {
   //       await api.delete(`/api/conversations/${uid}/${id}`);
   //       fetchConversations();
   //    } catch (error) {
   //       setError(true);
   //    }
   // };

   // const deleteAllConversations = async (userId: string) => {
   //    try {
   //       await api.delete(`/api/conversations/${uid}`);
   //       fetchConversations(userId);
   //    } catch (error) {
   //       setError(true);
   //    }
   // };

   useEffect(() => {
      if (uid) {
         fetchConversations();
      }
   }, []);

   return (
      <div className="flex flex-col h-full py-5 px-4 md:px-0">
         <div className="flex gap-2 items-center w-full mb-5 px-2">
            <Button
               variant={"default"}
               className="w-full text-[13px] font-medium text-primary-foreground h-10 rounded-[8px] gap-2"
               onClick={() => window.location.reload()}
            >
               New Topic
            </Button>
         </div>

         <span className="pl-5 text-xs text-muted-foreground mb-2">
            Conversation History
         </span>

         <div className="flex-1 overflow-hidden px-2">
            <div className="h-full overflow-y-auto">
               <div className="sticky top-0 h-5 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
               <div
                  className={`flex ${
                     conversations.length === 0 ? "h-full max-h-[90%]" : ""
                  } flex-col`}
               >
                  {isLoading ? (
                     <div className="grid gap-3">
                        {Array.from({ length: 10 }).map((_, index) => (
                           <Skeleton
                              key={index}
                              className="w-full h-6 rounded-[8px] bg-muted bg-accent"
                           />
                        ))}
                     </div>
                  ) : error ? (
                     <div className="flex flex-col items-center justify-center h-full text-xs text-muted-foreground">
                        Fetch Data Error.
                        <Button
                           variant={"outline"}
                           className="text-[13px] mt-2 w-1/2 font-medium h-8 rounded-[8px] gap-2"
                           onClick={() => fetchConversations()}
                        >
                           Try Again
                        </Button>
                     </div>
                  ) : conversations.length > 0 ? (
                     conversations?.map((conversation) => (
                        <div
                           key={conversation.id}
                           className="group flex items-center p-3 text-[13px] overflow-hidden rounded-sm hover:bg-accent hover:opacity-80 hover:rounded-sm hover:cursor-pointer"
                        >
                           <span className="inline-block max-w-full truncate capitalize transition-transform duration-300 group-hover:translate-x-1 text-white/80 font-medium">
                              {conversation.title}
                           </span>
                        </div>
                     ))
                  ) : (
                     <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                        No conversations found
                     </div>
                  )}
               </div>
               <div className="sticky bottom-0 h-5 bg-gradient-to-b from-transparent to-background pointer-events-none z-10"></div>
            </div>
         </div>

         <div className="mt-auto md:mb-4">
            <div className="border border-t-gray-800 border-b-0 border-x-0 mb-3 md:mb-1 mx-3"></div>
            <UserSettings />
         </div>
      </div>
   );
};

export default LeftBar;
