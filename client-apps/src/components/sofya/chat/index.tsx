import { Message } from "ai/react";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";

interface PropsTypes {
   messages: Message[];
   isLoading: boolean;
   submitLoading: boolean;
   error: string | null;
   input: string;
   setInput: React.Dispatch<React.SetStateAction<string>>;
   reload: () => void;
   handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Chat = ({ messages, isLoading, submitLoading, error, input, reload, handleInputChange, onSubmit, setInput }: PropsTypes) => {

   return (
      <div className="flex flex-col flex-1">
         <div className="h-full overflow-hidden w-full">
            <div className="h-full flex flex-col w-full">
               <div className="flex-grow overflow-y-auto w-full relative ">
                  <div className="sticky top-0 h-5 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                  <ChatList
                     messages={messages}
                     isLoading={isLoading}
                     isSubmitLoading={submitLoading}
                     error={error}
                     reload={reload}
                  />
                  <div className="sticky bottom-0 h-5 bg-gradient-to-b from-transparent to-background pointer-events-none z-11"></div>
               </div>
               <ChatBottombar
                  value={input}
                  setInput={setInput}
                  isLoading={isLoading}
                  onChange={handleInputChange}
                  onSubmit={onSubmit}
               />
            </div>
         </div>
      </div>
   );
};

export default Chat;
