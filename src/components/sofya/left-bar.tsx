import { ChevronLeft, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import UserSettings from "./user-settings";

const dummyData = [
   {
      id: "asdasd-asdxczx-asdw",
      title: "Topic 1",
   },
   {
      id: "asdasd-asdxczx-asdw2",
      title: "Topic 2",
   },
];

const LeftBar = () => {
   return (
      <div className="hidden md:flex md:flex-col w-full max-w-[250px] h-full ">
         <div className="flex flex-col h-full py-5">
            <div className="flex gap-2 items-center w-full mb-5 px-2">
               <Button
                  variant={"default"}
                  className="w-full text-[13px] font-medium text-primary-foreground h-10 rounded-[8px] gap-2"
               >
                  New Topic
               </Button>
            </div>

            <span className="pl-5 text-xs text-muted-foreground mb-2">
               Conversation History
            </span>
            <div className="flex-1 overflow-hidden px-2">
               <div className="h-full overflow-y-auto">
                  <div className="sticky top-0 h-5 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
                  <div className="flex flex-col">
                     {Array.from({ length: 100 }).map((item, index) => (
                        <div
                           key={index}
                           className="group flex items-center p-3 text-[13px] overflow-hidden rounded-sm hover:bg-accent hover:opacity-80 hover:rounded-sm hover:cursor-pointer"
                        >
                           <span className="inline-block max-w-full truncate capitalize transition-transform duration-300 group-hover:translate-x-1 text-white/80 font-medium">
                              asdasdasdasdsd
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="sticky bottom-0 h-5 bg-gradient-to-b from-transparent to-background pointer-events-none z-10"></div>
               </div>
            </div>

            <div className="mt-auto mb-4">
               <div className="border border-t-gray-800 border-b-0 border-x-0 mb-1 mx-3"></div>
               <UserSettings />
            </div>
         </div>
      </div>
   );
};

export default LeftBar;
