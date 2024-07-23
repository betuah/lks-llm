import { Message } from "ai/react";
import ChatMessage from "./chat-message";
import ChatLoading from "./chat-loading";
import { Button } from "@/components/ui/button";

interface ChatProps {
   messages: Message[];
   isLoading: boolean;
   isSubmitLoading: boolean;
   error: string | null;
   reload: () => void;
}

const ChatList = ({
   messages,
   isLoading,
   isSubmitLoading,
   error,
   reload,
}: ChatProps) => {
   return (
      <div
         className="grid gap-3 px-4"
         ref={(ref) => {
            if (ref) {
               ref.scrollTop = ref.scrollHeight;
            }
         }}
      >
         {messages.map((msg, i) => (
            <div key={i}>
               <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  isLoading={isLoading}
                  messages={messages}
                  index={i}
                  reload={reload}
               />
            </div>
         ))}

         {isSubmitLoading && <ChatLoading />}

         {!isSubmitLoading && !isLoading && error && (
            <div className="flex flex-col">
               <div className="flex flex-col p-6 rounded-md border border-red-600 bg-red-6000 bg-opacity-50 text-red-600 text-xs text-center mb-4">
                  <span className="flex justify-center items-center">
                     We apologize, but it seems something didn$apos;t go as planned. 
                     Here are a few steps you can try: Ensure you have a stable
                     internet connection. Try regenerating your request after a few
                     moments.
                  </span>
               </div>
               <div className="flex justify-center">
                  <Button onClick={reload}>Regenerate</Button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ChatList;
