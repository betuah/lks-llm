import TextareaAutosize from "react-textarea-autosize";
import { Mic, PaperclipIcon, SendHorizonal } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ChatRequestOptions } from "ai";

import { Button } from "@/components/ui/button";
import StopIcon from "@/components/svg/stopIcon";
import { toast } from "sonner";

interface ChatBottomProps {
   value: string;
   isLoading: boolean;
   setInput: React.Dispatch<React.SetStateAction<string>>;
   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   onSubmit: (
      e: React.FormEvent<HTMLFormElement>,
      chatRequestOptions?: ChatRequestOptions
   ) => void;
}

const ChatBottomBar: React.FC<ChatBottomProps> = ({
   value,
   isLoading,
   setInput,
   onChange,
   onSubmit,
}) => {
   const [isListening, setIsListening] = useState(false);
   const recognitionRef = useRef<any>(null);

   const toggleListening = useCallback(() => {
      if (!("webkitSpeechRecognition" in window)) {
         toast.error("Speech recognition is not supported in your browser.");
         return;
      }

      if (isListening) {
         setIsListening(false);
         recognitionRef.current?.stop();
      } else {
         const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;
         const recognition = new SpeechRecognition();
         recognition.continuous = true;
         recognition.interimResults = true;
         recognition.lang = "en-US"; // Set the language. Change this if you need a different language.

         let finalTranscript = "";

         recognition.onstart = () => {
            toast.success("Speech recognition started");
            setIsListening(true);
         };

         recognition.onresult = (event: any) => {
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
               if (event.results[i].isFinal) {
                  finalTranscript += event.results[i][0].transcript;
               } else {
                  interimTranscript += event.results[i][0].transcript;
               }
            }

            // Only update the input with the final transcript
            if (finalTranscript !== "") {
               setInput((prevInput) => {
                  const newInput =
                     prevInput.trim() + " " + finalTranscript.trim();
                  return newInput.trim(); // Ensure no leading/trailing spaces
               });
               finalTranscript = ""; // Reset for the next final result
            }

            // Use interimTranscript for real-time feedback if needed
            // console.log("Interim transcript:", interimTranscript);
         };

         recognition.onerror = (event: any) => {
            toast.error("Speech recognition error");
            console.error("Speech recognition error", event.error);
            setIsListening(false);
         };

         recognition.onend = () => {
            toast.success("Speech recognition ended");
            setIsListening(false);
         };

         try {
            recognition.start();
            recognitionRef.current = recognition;
         } catch (error) {
            toast.error("Error starting speech recognition:");
            console.error("Error starting speech recognition:", error);
            setIsListening(false);
         }
      }
   }, [isListening, setInput]);

   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
   };

   return (
      <div className="pb-2 pt-2 px-4 flex flex-col justify-between w-full items-center gap-2">
         <div className="w-full items-center flex relative gap-2">
            <div className="absolute left-3 z-10">
               <Button
                  className="shrink-0 rounded-full"
                  variant="ghost"
                  size="icon"
               >
                  <PaperclipIcon className="w-5 h-5" />
               </Button>
            </div>
            <form
               onSubmit={onSubmit}
               className="w-full items-center flex gap-2"
            >
               <TextareaAutosize
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                  onKeyDown={handleKeyPress}
                  className="max-h-24 pl-14 pr-24 bg-accent py-[22px] text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-full flex items-center h-16 resize-none overflow-hidden dark:bg-accent"
                  placeholder="Write a message..."
               />
               {!isLoading ? (
                  <div className="flex absolute right-3 items-center">
                     {isListening ? (
                        <Button
                           className="shrink-0 relative rounded-full bg-blue-500/30 hover:bg-blue-400/30 "
                           variant="ghost"
                           size="icon"
                           type="button"
                           onClick={toggleListening}
                           disabled={isLoading}
                        >
                           <Mic className="w-5 h-5 " />
                           <span className="animate-pulse absolute h-[120%] w-[120%] rounded-full bg-blue-500/30" />
                        </Button>
                     ) : (
                        <Button
                           className="shrink-0 rounded-full"
                           variant="ghost"
                           size="icon"
                           type="button"
                           onClick={toggleListening}
                           disabled={isLoading}
                        >
                           <Mic className="w-5 h-5 " />
                        </Button>
                     )}
                     <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="submit"
                        disabled={isLoading || !value || isListening}
                     >
                        <SendHorizonal className="w-5 h-5 " />
                     </Button>
                  </div>
               ) : (
                  <div className="flex absolute right-3 items-center">
                     <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="button"
                        disabled={true}
                     >
                        <Mic className="w-5 h-5 " />
                     </Button>
                     <Button
                        className="shrink-0 rounded-full"
                        variant="ghost"
                        size="icon"
                        type="submit"
                        onClick={(e) => {
                           e.preventDefault();
                           stop();
                        }}
                     >
                        <StopIcon className="w-5 h-5" />
                     </Button>
                  </div>
               )}
            </form>
         </div>
         <div className="text-[10px] italic">
            Copyright @ Cloud Computing LKS Nasional 2024 Team
         </div>
      </div>
   );
};

export default ChatBottomBar;
