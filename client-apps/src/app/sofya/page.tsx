"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useChat } from "ai/react";
import { v4 as uuid } from 'uuid';
import { AlignJustify, GanttChartIcon } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import Sofya from "@/components/sofya/chat/index";
import LeftBar from "@/components/sofya/left-bar";
import RightBar from "@/components/sofya/right-bar";

import { SettingsTypes, AssessmentCriteria } from "@/components/sofya/sofya-types";

const ChatLayout = () => {
   const { data: session, status } = useSession();
   const userData = session?.user as any;

   const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
   const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

   const [settingsData, setSettingsData] = useState<SettingsTypes>({
      llmModel: "orca-mini",
      embedModel: "nomic-embed-text",
      region: "us-east-1",
      name: userData?.name,
   });
   const [conversationId, setConversationId] = useState<string>(uuid());
   const [conversations, setConversations] = useState([]);
   const [assesment, setAssesment] = useState<AssessmentCriteria[]>([]);
   const [submitLoading, setSubmitLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const {
      messages,
      setMessages,
      input,
      isLoading,
      setInput,
      handleInputChange,
      handleSubmit,
      reload,
   } = useChat({
      api: "/api/chat",
      body: {
         id: conversationId,
         model: settingsData.llmModel,
         name: userData?.name,
         region: settingsData.region,
      },
      initialMessages: [
         {
            id: "1",
            role: "assistant",
            content: `Hi **${userData?.name}**! I'm **Sofya**, your English language partner. 😊 I’m really excited to chat with you and help you improve your English skills.`,
         },
      ],
      onResponse: (response: Response) => {
         setSubmitLoading(false);
      },
      onError: (error: Error) => {
         setError(error.message);
      },
   });

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitLoading(true);
      handleSubmit();
   };

   const saveConversations = async () => {
      try {
         await api.post(`/conversations/${session?.user?.id}`, {
            id: conversationId,
            title: messages[1].content.slice(0, 50),
            conversation: messages.slice(1),
         })

         getAllConversations()
      } catch (error) {
         toast.error('Save conversation error!')
      }
   }

   const getAllConversations = async () => {
      try {
         const response = await api.get(`/conversations/${session?.user?.id}`)

         setConversations(response.data)
      } catch (error) {
         toast.error('Save conversation error!')
      }
   }

   const handleConversationChange = (data: any) => {
      setConversations(data)
   };

   const handleSettings = (data: SettingsTypes) => {
      setSettingsData(data);
   }

   const conversationStats = async () => {
      try {
         const response = await fetch(`/api/stats`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               conversations: messages,
               model: settingsData.llmModel,
               region: settingsData.region
            })
         })

         const data = await response.json()
         const resData = data.data
         setAssesment(resData)
      } catch (error) {
         console.log(error)
         toast.error('Get Conversations Stats error!')
      }
   }

   useEffect(() => {
      if (!isLoading && messages.length > 1) {
         conversationStats()
      }
   }, [isLoading])

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const storedSettings = localStorage.getItem("settings");
         if (storedSettings) {
            setSettingsData(JSON.parse(storedSettings));
         }
      }
   }, []);

   useEffect(() => {
      if (!isLoading) {
         if (messages.length > 1) {
            saveConversations()
         }
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading]);

   if (status === "loading") {
      return (
         <div className="flex flex-col h-screen pb-12">
            <div className="hidden md:flex flex-col gap-3 flex-1 mb-8 mt-14">
               <div className="flex flex-col gap-2 w-full max-w-[75rem] mb-3 mx-auto">
                  <Skeleton className="w-[20%] h-5 mx-auto bg-accent" />
                  <Skeleton className="w-[50%] h-3 mx-auto bg-accent" />
               </div>
               <div className="w-full max-w-[75rem] mx-auto h-full flex gap-4">
                  <div className="hidden md:flex md:flex-col w-full max-w-[280px] h-full gap-4">
                     <Skeleton className="w-full h-14 bg-accent rounded-[8px]" />
                     <Skeleton className="w-full h-full bg-accent rounded-[8px]" />
                     <Skeleton className="w-full h-14 bg-accent rounded-[8px]" />
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                     <div className="flex flex-col gap-4">
                        <Skeleton className="w-full h-20 bg-accent" />
                        <Skeleton className="w-[80%] h-20 bg-accent" />
                     </div>
                     <Skeleton className="w-full h-14 bg-accent" />
                  </div>
                  <div className="hidden md:flex flex-col gap-4 w-full max-w-[280px]">
                     <Skeleton className="w-full h-[60%] bg-accent" />
                     <Skeleton className="w-full h-[10%] bg-accent" />
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="flex flex-col h-screen ">
         <div className="flex-shrink-0">
            <div className="flex justify-between items-center px-4 pt-4">
               <Drawer
                  open={isLeftDrawerOpen}
                  onOpenChange={setIsLeftDrawerOpen}
                  direction="left"
               >
                  <DrawerTrigger asChild>
                     <AlignJustify
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsLeftDrawerOpen(true)}
                     />
                  </DrawerTrigger>
                  <DrawerContent>
                     <LeftBar 
                        uid={userData?.id} 
                        conversationId={conversationId}
                        conversations={conversations} 
                        settingsData={settingsData}
                        setConversationId={setConversationId}
                        setConversations={handleConversationChange} 
                        setMessages={setMessages}
                        setSettingsData={handleSettings}
                     />
                  </DrawerContent>
               </Drawer>

               <div className="w-full md:mt-8 z-10 text-center mb-3">
                  <h1 className="text-2xl md:text-4xl font-bold">
                     Chat with <span className="text-secondary">Sofya</span>
                  </h1>
                  <span className="hidden md:block text-[9px] md:text-sm">
                     Your English Learning Partner to Boost Your English Skills
                     Effortlessly!
                  </span>
               </div>

               <Drawer
                  open={isRightDrawerOpen}
                  onOpenChange={setIsRightDrawerOpen}
                  direction="bottom"
               >
                  <DrawerTrigger asChild>
                     <GanttChartIcon
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsRightDrawerOpen(true)}
                     />
                  </DrawerTrigger>
                  <DrawerContent>
                     <RightBar scores={assesment} />
                  </DrawerContent>
               </Drawer>
            </div>
         </div>
         <div className="flex flex-1 overflow-hidden ">
            <div className="w-full max-w-[75rem] mx-auto h-full flex ">
               <div className="hidden md:flex md:flex-col w-full max-w-[280px] h-full ">
                  <LeftBar 
                     uid={userData?.id} 
                     conversationId={conversationId}
                     conversations={conversations} 
                     settingsData={settingsData}
                     setConversationId={setConversationId}
                     setConversations={handleConversationChange} 
                     setMessages={setMessages} 
                     setSettingsData={handleSettings}
                  />
               </div>
               <Sofya
                  messages={messages}
                  isLoading={isLoading}
                  submitLoading={submitLoading}
                  error={error}
                  input={input}
                  reload={reload}
                  handleInputChange={handleInputChange}
                  onSubmit={onSubmit}
                  setInput={setInput}
               />
               <div className="hidden md:flex w-full max-w-[280px]">
                  <RightBar scores={assesment} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatLayout;
