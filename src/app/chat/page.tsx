"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
   ResizableHandle,
   ResizablePanel,
   ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "@/components/sidebar";
import { toast } from "sonner";
import ChatContext from "@/context/ChatContext";
import Chat from "@/components/chat/chat";

import { ollama_url } from "@/config/env";

const ChatLayout = () => {
   const defaultLayout = [30, 160];
   const navCollapsedSize = 10;

   const [isCollapsed, setIsCollapsed] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   // State
   const [models, setModels] = useState<ChatContext["models"]>([]);
   const [currentModel, setCurrentModel] =
      useState<ChatContext["currentModel"]>(null);
   const [messages, setMessages] = useState<ChatContext["messages"]>({
      id: "",
      message: [],
   })

   const [isLoading, setIsLoading] = useState(false);
   const [chatId, setChatId] = useState<string>("");

   const getModels = async () => {
      try {
         const res = await fetch(`${ollama_url}/api/tags`);
         const json = await res.json();
         setModels([...json.models.map((model: any) => model.name)]);
      } catch (error) {
         toast.error("Error: " + error);
      }
   };

   useEffect(() => {
      getModels();

      const checkScreenWidth = () => {
         setIsMobile(window.innerWidth <= 1023);
      };

      // Initial check
      checkScreenWidth();

      // Event listener for screen width changes
      window.addEventListener("resize", checkScreenWidth);

      // Cleanup the event listener on component unmount
      return () => {
         window.removeEventListener("resize", checkScreenWidth);
      };
   }, []);

   return (
      <ChatContext.Provider
         value={{
            models,
            currentModel,
            isLoading,
            chatId,
            messages,
            setCurrentModel,
            setModels,
            setIsLoading,
            setChatId,
            setMessages,
         }}
      >
         <main className="flex h-[calc(100dvh)] flex-col items-center">
            <ResizablePanelGroup
               direction="horizontal"
               onLayout={(sizes: number[]) => {
                  document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                     sizes
                  )}`;
               }}
               className="h-screen items-stretch"
            >
               <ResizablePanel
                  defaultSize={defaultLayout[0]}
                  collapsedSize={navCollapsedSize}
                  collapsible={true}
                  minSize={isMobile ? 0 : 12}
                  maxSize={isMobile ? 0 : 16}
                  onCollapse={() => {
                     setIsCollapsed(true);
                     document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        true
                     )}`;
                  }}
                  onExpand={() => {
                     setIsCollapsed(false);
                     document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        false
                     )}`;
                  }}
                  className={cn(
                     isCollapsed
                        ? "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
                        : "hidden md:block"
                  )}
               >
                  <Sidebar
                     isCollapsed={isCollapsed || isMobile}
                     messages={[]}
                     isMobile={isMobile}
                     chatId={"1"}
                  />
               </ResizablePanel>
               <ResizableHandle className={cn("hidden md:flex")} withHandle />
               <ResizablePanel
                  className=" bg-background "
                  defaultSize={defaultLayout[1]}
               >
                  <Chat />
               </ResizablePanel>
            </ResizablePanelGroup>
         </main>
      </ChatContext.Provider>
   );
};

export default ChatLayout;
