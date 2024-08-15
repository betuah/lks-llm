import { Button } from "@/components/ui/button";
import UserSettings from "./user-settings";
import Conversations from "./conversations";
import { Dot } from "lucide-react";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { SettingsTypes } from "./sofya-types";

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
   settingsData: SettingsTypes;
   setConversationId: (id: string) => void;
   setConversations: (data: ConversationTypes[]) => void;
   setMessages: (data: any) => void;
   setSettingsData: (data: SettingsTypes) => void;
}

const LeftBar: React.FC<PropsTypes> = ({
   uid,
   conversations,
   conversationId,
   settingsData,
   setConversations,
   setMessages,
   setConversationId,
   setSettingsData,
}) => {
   const [regionStat, setregionStat] = useState<boolean>(false);

   const checkRegion = async () => {
      try {
         await api.get(`/${settingsData.region}/tags`);

         return true;
      } catch (error) {
         return false;
      }
   };

   const handleSettings = (data: any) => {
      setSettingsData({ ...data });
   };

   useEffect(() => {
      const checkAndUpdateRegion = async () => {
         const result = await checkRegion();
         setregionStat(result);
      };

      checkAndUpdateRegion();

      const intervalId = setInterval(checkAndUpdateRegion, 15000);

      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
            <div className="flex flex-col px-6 pt-2">
               <span className="text-xs text-muted-foreground">
                  Current Region
               </span>
               <div className="flex items-center">
                  <span className="text-sm font-medium">
                     {settingsData.region === "us-east-1"
                        ? "N.Virginia"
                        : "Oregon"}{" "}
                     ({settingsData.region})
                  </span>
                  <Dot
                     className={`ml-auto w-10 h-10 ${
                        regionStat ? "text-green-500" : "text-red-500"
                     }`}
                  />
               </div>
            </div>

            <div className="border border-t-gray-800 border-b-0 border-x-0 mb-3 md:mb-1 mx-3"></div>
            <UserSettings setSettings={handleSettings} />
         </div>
      </div>
   );
};

export default LeftBar;
