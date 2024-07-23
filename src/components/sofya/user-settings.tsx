"use client";

import { useEffect, useState } from "react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GearIcon } from "@radix-ui/react-icons";
// import UsernameForm from "./username-form";
import EditUsernameForm from "./edit-username-form";
import { Skeleton } from "@/components/ui/skeleton";

const UserSettings = () => {
   const [name, setName] = useState("Betuah Anugerah");
   const [open, setOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const handleStorageChange = () => {
         const username = localStorage.getItem("username");
         if (username) {
            setName("Betuah Anugerah");
            setIsLoading(false);
         }

         window.addEventListener("storage", handleStorageChange);

         return () => {
            window.removeEventListener("storage", handleStorageChange);
         };
      };
   }, []);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               className="flex justify-start gap-3 w-full h-14 text-base font-normal items-center"
            >
               <Avatar className="flex justify-start items-center overflow-hidden">
                  <AvatarImage
                     src=""
                     alt="AI"
                     width={4}
                     height={4}
                     className="object-contain"
                  />
                  <AvatarFallback className="bg-accent">
                     {name && name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div className="text-xs truncate">
                  {isLoading ? (
                     <Skeleton className="w-20 h-4 bg-accent" />
                  ) : (
                     name || "Anonymous"
                  )}
               </div>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-60 p-2 bg-background border-[0.3px] border-white">
            <Dialog>
               <DialogTrigger className="w-full">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                     <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
                        <GearIcon className="w-4 h-4" />
                        Settings
                     </div>
                  </DropdownMenuItem>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader className="space-y-4">
                     <DialogTitle>Settings</DialogTitle>
                     <EditUsernameForm setOpen={setOpen} />
                  </DialogHeader>
               </DialogContent>
            </Dialog>
            <Dialog></Dialog>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default UserSettings;