import { ClipboardIcon, Volume2, RefreshCcw, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ChatButtonProps {
   reload: () => void;
   text: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ reload, text }) => {
   const [isCopied, setIsCopied] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

   const getTextToCopy = (fullText: string): string => {
      const notesIndex = fullText.indexOf("Notes:");
      return notesIndex !== -1
         ? fullText.slice(0, notesIndex).trim()
         : fullText.trim();
   };

   const handleCopy = async () => {
      try {
         const textToCopy = getTextToCopy(text);
         await navigator.clipboard.writeText(textToCopy);
         setIsCopied(true);
      } catch (err) {
         console.error("Gagal menyalin teks: ", err);
      }
   };

   const handleSpeak = () => {
      if (isPlaying) {
         speechSynthesis.cancel();
         setIsPlaying(false);
         return;
      }

      const textToSpeak = getTextToCopy(text);

      if (utteranceRef.current) {
         utteranceRef.current.text = textToSpeak;
         utteranceRef.current.onend = () => setIsPlaying(false);
         utteranceRef.current.onstart = () => setIsPlaying(true);
         speechSynthesis.speak(utteranceRef.current);
      }
   };

   useEffect(() => {
      utteranceRef.current = new SpeechSynthesisUtterance();
      utteranceRef.current.lang = "en-US";

      speechSynthesis.onvoiceschanged = () => {
         const voices = speechSynthesis.getVoices();
         console.log(voices)
         const femaleVoice = voices.find(
            (voice) =>
               voice.name.includes("female") ||
               voice.name.includes("Female") ||
               voice.name.includes("FEMALE") ||
               voice.name.includes("woman") ||
               voice.name.includes("Woman") ||
               voice.name.includes("WOMAN") ||
               voice.name.includes("girl") ||
               voice.name.includes("Girl") ||
               voice.name.includes("GIRL")
         );
         if (femaleVoice) {
            utteranceRef.current!.voice = femaleVoice;
         }
      };

      return () => {
         if (utteranceRef.current) {
            speechSynthesis.cancel();
         }
      };
   }, []);

   useEffect(() => {
      if (isCopied) {
         const timer = setTimeout(() => {
            setIsCopied(false);
         }, 2000);

         return () => clearTimeout(timer);
      }
   }, [isCopied]);

   return (
      <div className="flex items-center gap-2 py-2">
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
            onClick={handleCopy}
         >
            {isCopied ? (
               <CheckIcon className="w-4 h-4" />
            ) : (
               <ClipboardIcon className="w-4 h-4" />
            )}
            <span className="sr-only">Salin</span>
         </Button>
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
            onClick={handleSpeak}
         >
            <Volume2 className="w-4 h-4" />
            <span className="sr-only">Buat Ulang</span>
         </Button>
         <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 hover:bg-transparent text-foreground hover:text-stone-500"
            onClick={reload}
         >
            <RefreshCcw className="w-4 h-4" />
            <span className="sr-only">Buat Ulang</span>
         </Button>
      </div>
   );
};

export default ChatButton;
