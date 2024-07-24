import { useState } from "react";
import { Message, useChat } from "ai/react";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";

const Chat = () => {
   const [name, setName] = useState<string>("Betuah Anugerah");
   const [submitLoading, setSubmitLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const {
      messages,
      input,
      isLoading,
      setInput,
      handleInputChange,
      handleSubmit,
      reload,
   } = useChat({
      api: "/api/chat",
      body: {
         model: "llama2",
      },
      initialMessages: [
         {
            id: "1",
            role: "assistant",
            content: `Hi **${name}**! I'm **Sofya**, your English language partner. 😊 I’m really excited to chat with you and help you improve your English skills.`,
         },
      ],
      onResponse: (response: Response) => {
         setSubmitLoading(false);
      },
      onError: (error: Error) => {
         setError(error.message);
      },
   });

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitLoading(true);
      handleSubmit();
   };

   return (
      <div className="flex flex-col flex-1">
         <div className="h-full overflow-hidden w-full">
            <div className="h-full flex flex-col w-full">
               {/* <div className="hidden md:block w-full px-4 pt-4 z-10 text-center">
                  <h1 className="text-2xl md:text-4xl font-bold">
                     Chat with <span className="text-secondary">Sofya</span>
                  </h1>
                  <span className="text-[9px] md:text-sm">
                     Your English Learning Partner to Boost Your English Skills
                     Effortlessly!
                  </span>
               </div> */}

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
               {/* <div className="w-full"> */}
               <ChatBottombar
                  value={input}
                  setInput={setInput}
                  isLoading={isLoading}
                  onChange={handleInputChange}
                  onSubmit={onSubmit}
               />
               {/* </div> */}
            </div>
         </div>
      </div>
   );
};

export default Chat;
