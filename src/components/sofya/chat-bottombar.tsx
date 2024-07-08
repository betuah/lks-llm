import TextareaAutosize from "react-textarea-autosize";
import { Mic, PaperclipIcon, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { ChatRequestOptions } from "ai";

import { Button } from "@/components/ui/button";
import StopIcon from "@/components/svg/stopIcon";

interface ChatBottomProps {
   value: string;
   isLoading: boolean;
   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onSubmit: (
      e: React.FormEvent<HTMLFormElement>,
      chatRequestOptions?: ChatRequestOptions
   ) => void;
}
const ChatBottomBar = ({
   value,
   isLoading,
   onChange,
   onSubmit,
}: ChatBottomProps) => {
   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
   };

   return (
      <div className="pb-2 pt-2 px-4 flex flex-col justify-between w-full items-center gap-2">
         <div className="w-full items-center flex relative gap-2">
            <div className="absolute left-3 z-10">
               <Button
                  className="shrink-0 rounded-full"
                  variant="ghost"
                  size="icon"
               >
                  <PaperclipIcon className="w-5 h-5" />
               </Button>
            </div>
            <form
               onSubmit={onSubmit}
               className="w-full items-center flex gap-2"
            >
               <TextareaAutosize
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                  onKeyDown={handleKeyPress}
                  className="max-h-24 px-14 bg-accent py-[22px] text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full  rounded-full flex items-center h-16 resize-none overflow-hidden dark:bg-accent"
                  placeholder="Write a message..."
               />
               {!isLoading ? (
                  <div className="flex absolute right-3 items-center">
                     <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="submit"
                        disabled={isLoading || !value}
                     >
                        <SendHorizonal className="w-5 h-5 " />
                     </Button>
                  </div>
               ) : (
                  <div className="flex absolute right-3 items-center">
                     <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="submit"
                        onClick={(e) => {
                           e.preventDefault();
                           stop();
                        }}
                     >
                        <StopIcon className="w-5 h-5" />
                     </Button>
                  </div>
               )}
            </form>
         </div>
         <div className="text-[10px] italic">
            Copyright @ Cloud Computing LKS Nasional 2024 Team
         </div>
      </div>
   );
};

export default ChatBottomBar;
