import { useEffect, useState } from "react";
import { Message } from "ai/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ChatButton from "@/components/chat/chat-button";
import CodeDisplayBlock from "@/components/code-display-block";
import RobotIcon from "@/components/svg/robotIcon";
import IconFaceManShimmer from "@/components/svg/faceManIcon";
import { Lightbulb } from "lucide-react";

interface MessageProps {
   role: string;
   content: string;
   isLoading: boolean;
   messages: Message[];
   index: number;
   reload: () => void;
}

const ChatMessage = ({
   role,
   content,
   isLoading,
   messages,
   index,
   reload
}: MessageProps) => {
   const [mainContent, setMainContent] = useState("");
   const [notes, setNotes] = useState("");
   const [isHovered, setIsHovered] = useState(false);
   const hasNotesMessage = (content: string) => {
      const parts = content.split("Notes:");
      return parts.length > 1;
   };

   useEffect(() => {
      const parts = content.split("Notes:");
      setMainContent(parts[0].trim());
      setNotes(parts.length > 1 ? parts[1].trim() : "");
   }, [content]);

   if (role === "user") {
      return (
         <div className="flex items-end gap-3">
            <div className="flex flex-row gap-4 bg-accent w-full p-4 rounded-lg">
               <div className="h-full p-2 bg-primary rounded-sm flex items-center justify-center">
                  <IconFaceManShimmer className="w-6 h-6 text-accent" />
               </div>
               <div className="flex flex-col items-start justify-center">
                  <span className="text-primary font-bold py-2">You</span>
                  <span className="pb-3 text-sm">{mainContent}</span>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div
         className="flex items-end gap-3"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div className="flex flex-row gap-4 bg-accent w-full p-4 rounded-lg">
            <div className="h-full p-2 bg-secondary rounded-sm flex items-center justify-center">
               <RobotIcon className="w-6 h-6 text-accent" />
            </div>
            <div className="flex flex-col items-start justify-center w-full">
               <div className="flex w-full justify-between items-center">
                  <span className="text-secondary font-bold py-2">Sofya AI</span>
                  {index !== 0 && isHovered && <ChatButton reload={reload} />}
               </div>
               <span className="text-sm">
                  {mainContent.split("```").map((part, index) => {
                     if (index % 2 === 0) {
                        return (
                           <Markdown key={index} remarkPlugins={[remarkGfm]}>
                              {part}
                           </Markdown>
                        );
                     } else {
                        return (
                           <pre className="whitespace-pre-wrap" key={index}>
                              <CodeDisplayBlock code={part} lang="" />
                           </pre>
                        );
                     }
                  })}
                  {isLoading &&
                     messages.indexOf(messages[index]) ===
                        messages.length - 1 && (
                        <span className="animate-pulse" aria-label="Typing">
                           ...
                        </span>
                     )}
               </span>

               {hasNotesMessage(messages[index]?.content) && (
                  <div className="flex gap-2 mt-5 mb-2 bg-background bg-opacity-10 rounded-sm p-4">
                     <span className="text-md text-secondary">💡</span>
                     <span className="text-xs italic text-secondary">
                        {notes}
                     </span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ChatMessage;
