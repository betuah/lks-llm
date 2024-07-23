"use client";

import Sofya from "@/components/sofya/chat/index";
import LeftBar from "@/components/sofya/left-bar";
import RightBar from "@/components/sofya/right-bar";

const ChatLayout = () => {
   return (
      <div className="flex flex-col h-screen">
         <div className="flex-shrink-0">
            <div className="hidden md:block w-full px-4 pt-4 md:mt-14 z-10 text-center">
               <h1 className="text-2xl md:text-4xl font-bold">
                  Chat with <span className="text-secondary">Sofya</span>
               </h1>
               <span className="text-[9px] md:text-sm">
                  Your English Learning Partner to Boost Your English Skills
                  Effortlessly!
               </span>
            </div>
         </div>
         <div className="flex flex-1 overflow-hidden ">
            <div className="max-w-8xl mx-auto h-full flex ">
               <LeftBar />
               <Sofya />
               <RightBar />
            </div>
         </div>
      </div>
   );
};

export default ChatLayout;
