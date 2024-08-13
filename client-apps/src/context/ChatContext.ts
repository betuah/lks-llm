import { createContext } from "react";

type Message = {
   role: string;
   content: string;
}

type Messages = {
   id: string;
   message: Message[]
}

interface ChatContext {
   chatId?: string;
   messages: Messages;
   isLoading: boolean;
   models: string[];
   currentModel: string | null;
   setChatId: React.Dispatch<React.SetStateAction<string>>;
   setMessages: (messages: Messages) => void;
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
   setModels: (models: string[]) => void;
   setCurrentModel: (model: string) => void;
}

const ChatContext = createContext<ChatContext>({
   chatId: "",
   messages: { id: "", message: [] },
   isLoading: false,
   models: [],
   currentModel: null,
   setChatId: () => {},
   setMessage: () => {},
   setIsLoading: () => {},
   setModels: () => {},
   setCurrentModel: () => {},
})

export default ChatContext