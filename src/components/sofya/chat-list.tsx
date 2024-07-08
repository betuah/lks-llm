import { Message } from "ai/react";
import ChatMessage from "@/components/sofya/chat-message";
import ChatLoading from "@/components/sofya/chat-loading";
import { Button } from "../ui/button";

interface ChatProps {
   messages: Message[];
   isLoading: boolean;
   isSubmitLoading: boolean;
   error: string | null;
   reload: () => void;
}

const ChatList = ({ messages, isLoading, isSubmitLoading, error, reload }: ChatProps) => {
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
            <div className="flex flex-row">
               <div className="p-6 rounded-md border border-red-600 bg-red-6000 bg-opacity-50 text-red-600">{error}</div>
               <Button onClick={reload}>Regenerate</Button>
            </div>
         )}
      </div>
   );
};

export default ChatList;
