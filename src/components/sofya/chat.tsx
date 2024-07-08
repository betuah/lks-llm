import { useState } from "react";
import { Message, useChat } from "ai/react";
import ChatList from "./chat-list";
import ChatBottombar from "./chat-bottombar";

const Chat = () => {
   const [name, setName] = useState<string>("Betuah Anugerah");
   const [submitLoading, setSubmitLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const { messages, input, isLoading, handleInputChange, handleSubmit, reload } =
      useChat({
         api: "/api/chat",
         body: {
            model: "llama2",
         },
         initialMessages: [
            {
               id: "1",
               role: "assistant",
               content: `Hi **${name}**! I'm **Sofya**, your English language partner. 😊 What interesting topic would you like to explore together today?`,
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
      <div className="flex flex-col w-full h-screen">
         <div className="w-full max-w-3xl mx-auto px-4 pt-4 mt-6 md:mt-14 z-10">
            <h1 className="text-3xl md:text-4xl font-bold">Chat with Sofya</h1>
            <span className="text-xs md:text-sm">
               Your English Learning Partner to Boost Your English Skills
               Effortlessly!
            </span>
         </div>

         <div className="flex-grow overflow-y-auto w-full max-w-3xl mx-auto relative ">
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
         <div className="w-full max-w-3xl mx-auto">
            <ChatBottombar
               value={input}
               isLoading={isLoading}
               onChange={handleInputChange}
               onSubmit={onSubmit}
            />
         </div>
      </div>
   );
};

export default Chat;
