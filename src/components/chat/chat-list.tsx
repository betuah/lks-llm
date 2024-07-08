import { Message } from "ai/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatButton from "@/components/chat/chat-button";
import CodeDisplayBlock from "@/components/code-display-block";
import { useEffect, useState } from "react";

interface ChatProps {
   messages: Message[];
   name: string;
   isLoading: boolean;
   isSubmitLoading?: boolean;
}

const ChatList = ({
   messages,
   name,
   isLoading,
   isSubmitLoading,
}: ChatProps) => {

   const [chatLoading, setChatLoading] = useState<boolean>(false);

   useEffect(() => {
      if (messages.length > 0) {
         const lastMessage = messages[messages.length - 1];
         if (lastMessage.role === "assistant") {
            setChatLoading(false);
         }

         console.log(messages)
      }
   }, [messages])

   // return (
   //    <div className="flex flex-col gap-4 border border-white">
   //       {messages.map((msg, i) => (
   //          <div key={i} className={cn("flex flex-col whitespace-pre-wrap border border-white")}>
   //             <div className="flex gap-3 items-start">
   //                {msg.role === "user" && (
   //                   <div className="flex items-end gap-3">
   //                      <div className="flex flex-row gap-4 bg-accent p-4 rounded-lg">
   //                         <Avatar className="flex justify-start items-center overflow-hidden">
   //                            <AvatarFallback className="w-10 h-10 bg-sky-200 text-sky-800">
   //                               {name && name.substring(0, 2).toUpperCase()}
   //                            </AvatarFallback>
   //                         </Avatar>
   //                         <div className="flex flex-col gap-5 items-start justify-center">
   //                            <span className="text-primary font-bold py-2">
   //                               Student
   //                            </span>
   //                            <span className="pb-3 text-sm">
   //                               {msg.content}
   //                            </span>
   //                         </div>
   //                      </div>
   //                   </div>
   //                )}

   //                {msg.role === "assistant" && (
   //                   <div className="flex items-end gap-3">
   //                      <div className="flex flex-row gap-4 bg-accent p-4 rounded-lg">
   //                         <Avatar className="flex justify-start items-center overflow-hidden">
   //                            <AvatarFallback className="w-10 h-10 bg-gray-600 text-primary">
   //                               {"AI".substring(0, 2).toUpperCase()}
   //                            </AvatarFallback>
   //                         </Avatar>
   //                         <div className="flex flex-col items-start justify-center">
   //                            <span className="text-primary font-bold py-2">
   //                               AI English Teacher
   //                            </span>
   //                            <span className="text-sm">
   //                               {msg.content
   //                                  .split("```")
   //                                  .map((part, index) => {
   //                                     if (index % 2 === 0) {
   //                                        return (
   //                                           <Markdown
   //                                              key={index}
   //                                              remarkPlugins={[remarkGfm]}
   //                                           >
   //                                              {part}
   //                                           </Markdown>
   //                                        );
   //                                     } else {
   //                                        return (
   //                                           <pre
   //                                              className="whitespace-pre-wrap"
   //                                              key={index}
   //                                           >
   //                                              <CodeDisplayBlock
   //                                                 code={part}
   //                                                 lang=""
   //                                              />
   //                                           </pre>
   //                                        );
   //                                     }
   //                                  })}
   //                               {isLoading &&
   //                                  messages.indexOf(msg) ===
   //                                     messages.length - 1 && (
   //                                     <span
   //                                        className="animate-pulse"
   //                                        aria-label="Typing"
   //                                     >
   //                                        ...
   //                                     </span>
   //                                  )}
   //                            </span>
   //                            <ChatButton />
   //                         </div>
   //                      </div>
   //                   </div>
   //                )}
   //             </div>
   //          </div>
   //       ))}

   //       {isSubmitLoading && (
   //          <div className="flex items-end gap-3">
   //             <div className="flex flex-row gap-4 bg-accent p-4 rounded-lg">
   //                <Avatar className="flex justify-start items-center overflow-hidden">
   //                   <AvatarFallback className="w-10 h-10 bg-gray-600 text-primary">
   //                      {"AI".substring(0, 2).toUpperCase()}
   //                   </AvatarFallback>
   //                </Avatar>
   //                <div className="flex flex-col gap-5 items-start justify-center">
   //                   <span className="text-primary font-bold py-2">
   //                      AI English Teacher
   //                   </span>
   //                   <span className="pb-3 text-xs">Please wait...</span>
   //                </div>
   //             </div>
   //          </div>
   //       )}
   //    </div>
   // );

   return (
      <div
         className="grid gap-3"
         ref={(ref) => {
            if (ref) {
               ref.scrollTop = ref.scrollHeight;
            }
         }}
      >
         {/* {JSON.stringify(messages)} */}

         {messages.map((msg, i) => (
            <div key={i}>
               {msg.role === "user" && (
                  <div className="flex items-end gap-3">
                     <div className="flex flex-row gap-4 bg-accent p-4 rounded-lg">
                        <Avatar className="flex justify-start items-center overflow-hidden">
                           <AvatarFallback className="w-10 h-10 bg-gray-600 text-primary font-bold">
                              {name && name.substring(0, 2).toUpperCase()}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-center">
                           <span className="text-primary font-bold py-2">
                              You
                           </span>
                           <span className="pb-3 text-sm">{msg.content}</span>
                        </div>
                     </div>
                  </div>
               )}

               {msg.role === "assistant" && (
                  <div className="flex items-end gap-3">
                     <div className="flex flex-row gap-4 bg-accent p-4 rounded-lg">
                        <Avatar className="flex justify-start items-center overflow-hidden">
                           <AvatarFallback className="w-10 h-10 bg-gray-600 text-primary font-bold">
                              {"AI".substring(0, 2).toUpperCase()}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start justify-center">
                           <span className="text-primary font-bold py-2">
                              AI English Teacher
                           </span>
                           <span className="text-sm">
                              {msg.content.split("```").map((part, index) => {
                                 if (index % 2 === 0) {
                                    return (
                                       <Markdown
                                          key={index}
                                          remarkPlugins={[remarkGfm]}
                                       >
                                          {part}
                                       </Markdown>
                                    );
                                 } else {
                                    return (
                                       <pre
                                          className="whitespace-pre-wrap"
                                          key={index}
                                       >
                                          <CodeDisplayBlock
                                             code={part}
                                             lang=""
                                          />
                                       </pre>
                                    );
                                 }
                              })}
                              {isLoading &&
                                 messages.indexOf(msg) ===
                                    messages.length - 1 && (
                                    <span
                                       className="animate-pulse"
                                       aria-label="Typing"
                                    >
                                       ...
                                    </span>
                                 )}
                           </span>
                           <ChatButton />
                        </div>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};

export default ChatList;
