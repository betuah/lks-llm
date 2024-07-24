"use client";

import Sofya from "@/components/sofya/chat/index";
import LeftBar from "@/components/sofya/left-bar";
import RightBar from "@/components/sofya/right-bar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AlignJustify, GanttChartIcon } from "lucide-react";
import { useState } from "react";

const ChatLayout = () => {
   const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
   const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

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
                  <DrawerContent >
                     <LeftBar />
                  </DrawerContent>
               </Drawer>

               <div className="w-full md:mt-14 z-10 text-center">
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
                  <DrawerContent >
                     <RightBar />
                  </DrawerContent>
               </Drawer>
            </div>
         </div>
         <div className="flex flex-1 overflow-hidden ">
            <div className="w-full max-w-[75rem] mx-auto h-full flex ">
               <div className="hidden md:flex md:flex-col w-full max-w-[280px] h-full ">
                  <LeftBar />
               </div>
               <Sofya />
               <div className="hidden md:flex w-full max-w-[280px]">
                  <RightBar />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatLayout;
