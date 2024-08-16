import { cn } from "@/lib/utils";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { AssessmentCriteria } from "./sofya-types";

interface PropsTypes {
   scores: AssessmentCriteria[];
}

const defaultData = [
   {
      "id": "written_fluency",
      "title": "Written Fluency",
      "desc": "Smooth and effortless expression of ideas in writing",
      "score": 0
   },
   {
      "id": "vocabulary",
      "title": "Vocabulary",
      "desc": "Wide range of appropriate and sophisticated words",
      "score": 0
   },
   {
      "id": "grammar",
      "title": "Grammar",
      "desc": "Correct use of complex grammatical structures",
      "score": 0
   },
   {
      "id": "comprehension",
      "title": "Comprehension",
      "desc": "Full understanding and appropriate responses",
      "score": 0
   },
   {
      "id": "coherence",
      "title": "Coherence",
      "desc": "Logically organized and clearly expressed ideas",
      "score": 0
   },
   {
      "id": "digital_etiquette",
      "title": "Digital Etiquette",
      "desc": "Proper use of punctuation, capitalization, and chat conventions",
      "score": 0
   },
   {
      "id": "responsiveness",
      "title": "Responsiveness",
      "desc": "Timely and relevant replies to previous messages",
      "score": 0
   },
   {
      "id": "clarity",
      "title": "Clarity",
      "desc": "Clear and unambiguous expression of thoughts",
      "score": 0
   },
   {
      "id": "overall_communication",
      "title": "Overall Communication",
      "desc": "Effective overall written communication skills",
      "score": 0
   }
]

const RightBar = ({ scores = defaultData }: PropsTypes) => {
   const scoresData = scores && scores.length > 0 ? scores : defaultData;
   const generateColor = (score: number) => {
      if (score < 25) {
         return "rose-400";
      } else if (score < 50) {
         return "orange-400";
      } else if (score < 75) {
         return "yellow-400";
      } else {
         return "green-400";
      }
   };

   const generateEnglishLevel = (score: number) => {
      if (score < 25) {
         return "Beginner";
      } else if (score < 50) {
         return "Intermediate";
      } else if (score < 75) {
         return "Advanced";
      } else {
         return "Native";
      }
   };

   const overallScore = scoresData.find(item => item.id === "overall_communication")?.score || 0;
   const englishLevel = generateEnglishLevel(overallScore);

   const calculateBarWidths = (score: number): number[] => [
      score <= 25 ? (score / 25) * 100 : 100,
      score <= 25 ? 0 : score <= 50 ? ((score - 25) / 25) * 100 : 100,
      score <= 50 ? 0 : score <= 75 ? ((score - 50) / 25) * 100 : 100,
      score <= 75 ? 0 : ((score - 75) / 25) * 100
   ];

   const barWidths = calculateBarWidths(overallScore);

   return (
      <div className="flex flex-col gap-3 w-full py-5 px-2">
         <div className="md:bg-accent rounded-sm p-6">
            <div className="pb-2 flex items-center justify-between">
               <span className="text-sm font-bold">Conversation Stats</span>
               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger asChild className="cursor-pointer">
                        <Info className="w-4 h-4 text-primary" />
                     </TooltipTrigger>
                     <TooltipContent className="w-[350px] bg-background border border-primary">
                        <p className="text-[11px] text-center">
                           This indicator is based on the current conversation
                           and does{" "}
                           <span className="font-medium text-primary">
                              not represent your overall ability
                           </span>
                           . Use this status indicator to{" "}
                           <span className="font-medium text-primary">identify</span> and
                           <span className="font-medium text-primary"> improve</span> areas
                           that need{" "}
                           <span className="font-medium text-primary">enhancement</span> to
                           help you improve your English skills. The indicators
                           might be incorrect.{" "}
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
               {scoresData.map((item) => (
                  <div key={item.id} className="grid gap-2 mt-5 w-full ">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div
                              className={cn(
                                 `w-1.5 h-1.5 rounded-full bg-${generateColor(item.score)}`
                              )}
                           />
                           <div className="flex items-center text-[13px] font-medium">
                              <span className="mr-1">{item.title}</span>
                              
                              <TooltipProvider>
                                 <Tooltip>
                                    <TooltipTrigger asChild className="cursor-pointer">
                                       <Info className="w-3 h-3 text-primary" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-background border border-primary">
                                       <p className="text-[11px] text-center text-primary">
                                          {item.desc}
                                       </p>
                                    </TooltipContent>
                                 </Tooltip>
                              </TooltipProvider>
                           </div>
                        </div>
                        <div className={`text-[10px] text-muted-foreground text-${generateColor(item.score)}`}>
                           {item.score}%
                        </div>
                     </div>
                     <div className="w-full bg-accent-foreground rounded-full h-1">
                        <div
                           className={cn(
                              `bg-${generateColor(item.score)} h-1 rounded-full`,
                              "transition-all duration-500 ease-in-out",
                              "animate-[pulse_1s_ease-in-out]"
                           )}
                           style={{ width: `${item.score}%` }}
                        />
                     </div>
                  </div>
               )).slice(0, -1)}
            </div>
         </div>
         <div className="bg-accent rounded-sm p-5 mx-4 md:border-0 md:p-6 md:mx-0">
            <div className="grid gap-2 w-full">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="text-[13px] font-medium">
                        English Level
                     </div>
                  </div>
                  <div className={cn(
                     "text-[10px] font-medium",
                     {
                        "text-sky-400": englishLevel === "Beginner",
                        "text-orange-400": englishLevel === "Intermediate",
                        "text-violet-400": englishLevel === "Advanced",
                        "text-green-400": englishLevel === "Native",
                     }
                  )}>
                     {englishLevel}
                  </div>
               </div>
               <div className="flex gap-1 flex-row">
                  {["bg-sky-400", "bg-orange-400", "bg-violet-400", "bg-green-400"].map((color, index) => (
                     <div key={color} className="flex flex-1 w-full bg-accent-foreground rounded-full h-1">
                        <div
                           className={cn(`${color} h-1 rounded-full transition-all duration-500 ease-in-out`)}
                           style={{ width: `${barWidths[index]}%` }}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default RightBar;
