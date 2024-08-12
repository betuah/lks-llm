import { Button } from "@/components/ui/button";
import UserSettings from "./user-settings";
import Conversations from "./conversations";

interface ConversationTypes {
   id: string;
   title: string;
   conversation: any;
   embedding?: any | null;
   createdAt: string;
   updatedAt: string;
}

interface PropsTypes {
   uid: string;
   conversations: ConversationTypes[];
   conversationId: string;
   setConversationId: (id: string) => void;
   setConversations: (data: ConversationTypes[]) => void;
   setMessages: (data: any) => void;
}

const LeftBar: React.FC<PropsTypes> = ({
   uid,
   conversations,
   conversationId,
   setConversations,
   setMessages,
   setConversationId,
}) => {
   return (
      <div className="flex flex-col h-full py-5 px-4 md:px-0">
         <div className="flex gap-2 items-center w-full mb-5 px-2">
            <Button
               variant={"default"}
               className="w-full text-[13px] font-medium text-primary-foreground h-10 rounded-[8px] gap-2"
               onClick={() => window.location.reload()}
            >
               New Topic
            </Button>
         </div>

         <Conversations
            uid={uid}
            conversations={conversations}
            conversationId={conversationId}
            setConversationId={setConversationId}
            setConversations={setConversations}
            setMessages={setMessages}
         />

         <div className="mt-auto md:mb-4">
            <div className="border border-t-gray-800 border-b-0 border-x-0 mb-3 md:mb-1 mx-3"></div>
            <UserSettings />
         </div>
      </div>
   );
};

export default LeftBar;
