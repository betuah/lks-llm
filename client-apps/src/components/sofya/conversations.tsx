import { useEffect, useState } from "react";
import { Ellipsis, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import api from "@/lib/api";

interface ConversationTypes {
   id: string;
   title: string;
   conversation: any;
   embedding?: any | null;
   createdAt: string;
   updatedAt: string;
}

interface PropsTypes {
   uid: string;
   conversations: ConversationTypes[];
   conversationId: string;
   setConversationId: (id: string) => void;
   setConversations: (data: ConversationTypes[]) => void;
   setMessages: (data: any) => void;
}

const Conversations = ({
   uid,
   conversations,
   conversationId,
   setConversationId,
   setConversations,
   setMessages,
}: PropsTypes) => {
   const [isLoading, setIsloading] = useState<boolean>(false);
   const [error, setError] = useState<boolean>(false);

   const fetchConversations = async () => {
      setIsloading(true);
      setError(false);
      try {
         const response = await api.get(`/conversations/${uid}`);
         const data = response.data;
         const sorted = data.sort(
            (
               a: { createdAt: string | number | Date },
               b: { createdAt: string | number | Date }
            ) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
         );

         setConversations(sorted);
      } catch (error) {
         setError(true);
      } finally {
         setIsloading(false);
      }
   };

   const deleteConversation = async (id: string) => {
      toast.promise(api.delete(`/conversations/${uid}/${id}`), {
         loading: "Deleting conversations...",
         success: (data) => {
            fetchConversations();
            return "Delete conversations successfully!";
         },
         error: "Failed to delete conversations!",
      });
   };

   const deleteAllConversations = async () => {
      toast.promise(api.delete(`/conversations/${uid}`), {
         loading: "Deleting all conversations...",
         success: (data) => {
            fetchConversations();
            return "Clear All conversations successfully!";
         },
         // success: "All conversations deleted successfully!",
         error: "Failed to delete all conversations!",
      });
   };

   const handleConversationClick = async (id: string, messages: any) => {
      setConversationId(id);
      setMessages(messages);
   };

   useEffect(() => {
      if (uid) {
         fetchConversations();
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="px-5 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
               Conversation History
            </span>

            <AlertDialog>
               <AlertDialogTrigger>
                  <div className="text-xs hover:cursor-pointer text-muted-foreground">
                     Clear
                  </div>
               </AlertDialogTrigger>
               <AlertDialogContent className="border border-rose-400 bg-background">
                  <AlertDialogHeader>
                     <AlertDialogTitle className="font-medium text-xl">
                        Are you absolutely sure?
                     </AlertDialogTitle>
                     <AlertDialogDescription className="text-xs">
                        This action cannot be undone. This will permanently
                        delete all your conversation data from out servers.
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel className="bg-transparent border border-gray-600 text-gray-300 hover:bg-accent hover:text-gray-300">
                        Cancel
                     </AlertDialogCancel>
                     <AlertDialogAction
                        className="bg-rose-400 hover:bg-rose-500 text-primary-foreground"
                        onClick={() => deleteAllConversations()}
                     >
                        Continue
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </div>

         <div className="flex-1 overflow-hidden px-2">
            <div className="h-full overflow-y-auto">
               <div className="sticky top-0 h-5 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
               <div
                  className={`flex gap-1 ${
                     conversations.length === 0 ? "h-full max-h-[90%]" : ""
                  } flex-col`}
               >
                  {isLoading ? (
                     <div className="grid gap-3">
                        {Array.from({ length: 10 }).map((_, index) => (
                           <Skeleton
                              key={index}
                              className="w-full h-6 rounded-[8px] bg-accent"
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
                     conversations?.map((item) => (
                        <div
                           key={item.id}
                           className={`group flex gap-2 items-center justify-between p-3 text-[13px] overflow-hidden rounded-sm ${
                              conversationId === item.id
                                 ? "bg-accent"
                                 : "bg-transparent"
                           } hover:bg-accent hover:opacity-80 hover:rounded-sm hover:cursor-pointer`}
                           onClick={() =>
                              handleConversationClick(
                                 item.id,
                                 item.conversation
                              )
                           }
                        >
                           <span
                              className={`inline-block max-w-full truncate capitalize transition-transform duration-300 ${
                                 conversationId === item.id
                                    ? "translate-x-0"
                                    : "translate-x-0"
                              } group-hover:translate-x-1 text-white/80 font-medium`}
                           >
                              {item.title}
                           </span>

                           <AlertDialog>
                              <AlertDialogTrigger>
                                 <div className="hidden group-hover:flex">
                                    <Trash2 className="w-3 h-3 text-rose-400 hover:text-rose-500" />
                                 </div>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="border border-rose-400 bg-background">
                                 <AlertDialogHeader>
                                    <AlertDialogTitle className="font-medium text-xl">
                                       Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs">
                                       This action cannot be undone. This will
                                       permanently delete your conversation data
                                       from out servers.
                                    </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-transparent border border-gray-600 text-gray-300 hover:bg-accent hover:text-gray-300">
                                       Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                       className="bg-rose-400 hover:bg-rose-500 text-primary-foreground"
                                       onClick={() =>
                                          deleteConversation(item.id)
                                       }
                                    >
                                       Continue
                                    </AlertDialogAction>
                                 </AlertDialogFooter>
                              </AlertDialogContent>
                           </AlertDialog>
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
      </>
   );
};

export default Conversations;
