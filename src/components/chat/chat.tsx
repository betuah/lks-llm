import ChatTopbar from "./chat-topbar";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";

import { useChat } from "ai/react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Chat = () => {
   const [name, setName] = useState<string>("Betuah Anugerah");
   const [loadingSubmit, setLoadingSubmit] = useState(false);

   const { messages, input, isLoading, handleInputChange, handleSubmit, stop } =
      useChat({
         api: "/api/chat",
         body: {
            model: "llama2",
         },
      });

   return (
      <div className="flex flex-col w-full h-screen border border-red-500">
         <ChatTopbar />
         <div className="flex-grow overflow-y-auto p-4 w-full max-w-3xl mx-auto border border-white">
            <ChatList
               messages={messages}
               name={name}
               isLoading={isLoading}
               isSubmitLoading={isLoading}
            />
         </div>
         <div className="w-full max-w-3xl mx-auto">
            <ChatBottombar
               value={input}
               isLoading={isLoading}
               isSubmitLoading={loadingSubmit}
               onChange={handleInputChange}
               onSubmit={handleSubmit}
            />
         </div>

         {/* <ChatTopbar />
         <ChatList messages={messages} name={name} isLoading={isLoading} isSubmitLoading={isLoading} /> 
         <ChatBottombar
            value={input}
            isLoading={isLoading}
            isSubmitLoading={loadingSubmit}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
         /> */}
      </div>
   );
};

export default Chat;
