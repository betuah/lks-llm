"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
import { Skeleton } from "@/components/ui/skeleton";
import SettingsFrom from "./settings-form";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface PropsTypes {
   setSettings: (data: any) => void;
}

const UserSettings = ({ setSettings }: PropsTypes) => {
   const { data: session, status } = useSession();
   const userData = session?.user as any;
   const [name, setName] = useState<string>(userData?.name);

   const [open, setOpen] = useState<boolean>(false);
   const [openMenu, setOpenMenu] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const handleSignOut = async () => {
      setIsLoading(true);
      try {
         await signOut({ callbackUrl: "/" });
      } catch (error) {
         console.error("Error signing out:", error);
      } finally {
         setIsLoading(false);
      }
   };

   const handleDialog = (request: boolean) => {
      setOpen(request);
      setOpenMenu(request);
   };

   return (
      <DropdownMenu onOpenChange={setOpenMenu} open={openMenu}>
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
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger className="w-full">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                     <div className="flex w-full gap-2 p-1 items-center cursor-pointer">
                        <GearIcon className="w-4 h-4" />
                        Settings
                     </div>
                  </DropdownMenuItem>
               </DialogTrigger>
               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div
                     className="flex w-full gap-2 p-1 items-center cursor-pointer"
                     onClick={handleSignOut}
                  >
                     <LogOut className="w-4 h-4" />
                     Sign Out
                  </div>
               </DropdownMenuItem>
               <DialogContent className="border border-primary">
                  <DialogHeader className="space-y-4">
                     <DialogTitle>Settings</DialogTitle>
                     <SettingsFrom setSettings={setSettings} open={open} setOpen={handleDialog} />
                  </DialogHeader>
               </DialogContent>
            </Dialog>
            <Dialog></Dialog>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default UserSettings;
