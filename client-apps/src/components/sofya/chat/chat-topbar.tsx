import { useContext, useEffect, useState } from "react";
import { CaretSortIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

import ChatContext from "@/context/ChatContext";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

const ChatTopbar = () => {
   const { models, currentModel, setCurrentModel } = useContext(ChatContext);
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const modelSelected = (model: string) => {
      setCurrentModel(model)
      setOpen(!open);
   };

   return (
      <div className="w-full flex px-4 pt-6 pb-4 justify-between items-center ">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  disabled={isLoading}
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between"
               >
                  {currentModel ?? "Select model"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-1">
               {models.length > 0 ? (
                  models.map((model, i) => (
                     <>
                        <Button
                           key={model}
                           variant="ghost"
                           className="w-full text-xs"
                           onClick={() => {
                              modelSelected(model);
                           }}
                        >
                           {model}
                        </Button>
                        {i < models.length - 1 && (
                           <Separator className="my-1" />
                        )}
                     </>
                  ))
               ) : (
                  <Button variant="ghost" disabled className=" w-full">
                     No models available
                  </Button>
               )}
            </PopoverContent>
         </Popover>
         <ModeToggle />
      </div>
   );
};

export default ChatTopbar;
