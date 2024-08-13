"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditUsernameFormProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setSettings: (data: any) => void;
}

export default function EditUsernameForm({ open, setOpen, setSettings }: EditUsernameFormProps) {
   const { data: session } = useSession();
   const sesData = session?.user as any;

   const [name, setName] = useState<string>(sesData?.name );
   const [llmModel, setLlmModel] = useState<string>("orca-mini");
   const [embedModel, setEmbedModel] = useState<string>("nomic-embed-text");
   const [region, setRegion] = useState<string>("us-east-1");
   const [isLoading, setLoading] = useState<boolean>(false);

   const handleSubmit = (e: React.FormEvent) => {
      setLoading(true);
      e.preventDefault();
      const data = { name, llmModel, embedModel, region };

      localStorage.setItem("settings", JSON.stringify(data));
      setSettings(data)
      window.dispatchEvent(new Event("storage"));
      toast.success("Settings saved!");
      setOpen(false);
      setLoading(false);
   };

   useEffect(() => {
      const settings = localStorage.getItem("settings");
      if (settings) {
         const data = JSON.parse(settings);
         setName(data.name);
         setLlmModel(data.llmModel);
         setEmbedModel(data.embedModel);
         setRegion(data.region);
      }
   }, [open]);

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className="flex flex-col gap-4">
            <div className="lex flex-col gap-4">
               <Label htmlFor="name">Full Name</Label>
               <div className="mt-2">
                  <Input
                     id="name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Enter your full name"
                  />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <Label htmlFor="region">Region</Label>
               <Select onValueChange={setRegion} value={region}>
                  <SelectTrigger>
                     <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="us-east-1">N. Virginia</SelectItem>
                     <SelectItem value="us-west-2">Oregon</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
               <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="llmModel">LLM Model</Label>
                  <Select onValueChange={setLlmModel} value={llmModel}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select LLM model" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="orca-mini">Orca Mini</SelectItem>
                        <SelectItem value="llama2">Llama 2</SelectItem>
                        {/* Add more LLM models as needed */}
                     </SelectContent>
                  </Select>
               </div>
               <div className="flex flex-1 flex-col gap-2">
                  <Label htmlFor="embedModel">Embed Model</Label>
                  <Select onValueChange={setEmbedModel} value={embedModel}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select embed model" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="nomic-embed-text">Nomic Embed Text</SelectItem>
                        <SelectItem value="bert">Bert</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <Button type="submit" disabled={isLoading}>
               {isLoading ? "Updating..." : "Update"}
            </Button>
         </div>
      </form>
   );
}
