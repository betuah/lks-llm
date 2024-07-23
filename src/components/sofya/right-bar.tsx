import { cn } from "@/libs/utils";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const RightBar = () => {
   const data = [
      {
         label: "Reading",
         value: 20,
         color: "bg-orange-400",
      },
      {
         label: "Writing",
         value: 20,
         color: "bg-green-400",
      },
      {
         label: "Grammar",
         value: 20,
         color: "bg-blue-400",
      },
      {
         label: "Vocabulary",
         value: 20,
         color: "bg-violet-400",
      },
      {
         label: "Pronunciation",
         value: 20,
         color: "bg-yellow-400",
      },
      {
         label: "Fluency",
         value: 20,
         color: "bg-rose-400",
      },
      {
         label: "Comprehension",
         value: 20,
         color: "bg-cyan-400",
      },
   ];

   return (
      <div className="hidden md:flex w-full max-w-[280px]">
         <div className="flex flex-col gap-3 w-full py-5 pr-5 pl-2">
            {/* <div className="bg-accent rounded-sm px-6 py-4">
               <span className="text-lg pb-2 font-bold">Attention:</span>
               <p className="text-[11px] text-justify font-thin">
                  This status is based on the current conversation and does not
                  represent your overall or actual ability. Use this status
                  indicator to identify and improve areas that need enhancement
                  to help you improve your English skills.
               </p>
            </div> */}

            <div className="bg-accent rounded-sm p-6">
               <div className="pb-2 flex items-center justify-between">
                  <span className="text-sm font-bold">Conversation Stats</span>
                  <TooltipProvider>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Info className="w-4 h-4 text-primary" />
                        </TooltipTrigger>
                        <TooltipContent className="w-[350px]">
                           <p className="text-[11px] font-thin text-center">
                              This indicator is based on the current conversation
                              and does{" "}
                              <span className="font-medium">
                                 not represent your overall ability
                              </span>
                              . Use this status indicator to{" "}
                              <span className="font-medium">identify</span> and
                              <span className="font-medium"> improve</span>{" "}
                              areas that need{" "}
                              <span className="font-medium">enhancement</span>{" "}
                              to help you improve your English skills. The
                              indicators might be incorrect.{" "}
                              <span className="font-medium text-primary">
                                 Please check your English proficiency with your
                                 teacher.
                              </span>
                           </p>
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               </div>

               <div className="grid">
                  {data.map((item) => (
                     <div key={item.label} className="grid gap-2 mt-5 w-full ">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div
                                 className={cn(
                                    `w-1.5 h-1.5 rounded-full ${item.color}`
                                 )}
                              />
                              <div className="text-[13px] font-medium">
                                 {item.label}
                              </div>
                           </div>
                           <div className="text-[10px] text-muted-foreground">
                              {item.value}%
                           </div>
                        </div>
                        <div className="w-full bg-accent-foreground rounded-full h-1">
                           <div
                              className={cn(
                                 `${item.color} h-1 rounded-full`
                              )}
                              style={{ width: `${item.value}%` }}
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-accent rounded-sm p-6">
               <div className="grid gap-2 w-full">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="text-[13px] font-medium">
                           English Level
                        </div>
                     </div>
                     <div className="text-[10px] text-green-400 font-medium">
                        Intermediate
                     </div>
                  </div>
                  <div className="flex gap-1 flex-row">
                     <div className="flex flex-1 w-full bg-accent rounded-full h-1">
                        <div
                           className={cn(`bg-red-400 h-1 rounded-full`)}
                           style={{ width: `100%` }}
                        />
                     </div>
                     <div className="flex flex-1 w-full bg-accent rounded-l-full h-1">
                        <div
                           className={cn(`bg-orange-400 h-1 rounded-full`)}
                           style={{ width: `100%` }}
                        />
                     </div>
                     <div className="flex flex-1 w-full bg-accent rounded-l-full h-1">
                        <div
                           className={cn(`bg-green-400 h-1 rounded-full`)}
                           style={{ width: `100%` }}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RightBar;
