import { Skeleton } from "@/components/ui/skeleton"

const ChatLoading = () => {
   return (
      <div className="flex items-start gap-4 p-4 rounded-lg border border-accent">
         <Skeleton className="h-11 w-11 rounded-md" />
         <div className="space-y-2 w-full">
            <Skeleton className="h-2 w-[150px] mb-3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
         </div>
      </div>
   );
};

export default ChatLoading;
