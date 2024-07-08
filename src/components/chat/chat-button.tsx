import {
   ClipboardIcon,
   ThumbsDownIcon,
   ThumbsUpIcon,
   RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatButton = ({reload}: {reload: () => void}) => {
   return (
      <div className="flex items-center gap-2 py-2">
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
         >
            <ClipboardIcon className="w-4 h-4" />
            <span className="sr-only">Copy</span>
         </Button>
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
         >
            <ThumbsUpIcon className="w-4 h-4" />
            <span className="sr-only">Like</span>
         </Button>
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
         >
            <ThumbsDownIcon className="w-4 h-4" />
            <span className="sr-only">Dislike</span>
         </Button>
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
            onClick={reload}
         >
            <RefreshCcw className="w-4 h-4" />
            <span className="sr-only">Regenerate</span>
         </Button>
      </div>
   );
};

export default ChatButton;
