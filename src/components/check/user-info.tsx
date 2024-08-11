import React from 'react';

export interface UserInfoProps {
   id?: string;
   name?: string;
   email?: string;
   status: string;
   idToken?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ id, name, email, status, idToken }) => {
   return (
      <div className="grid gap-3 p-4 rounded-lg border-2 border-primary w-full bg-accent">
         <div className="flex flex-col gap-2 ">
            <div className="flex flex-col">
               <span className="text-muted-foreground text-[11px]">UID</span>
               <span className="font-medium text-xs">{id}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-muted-foreground text-[11px]">Your Name</span>
               <span className="font-medium text-md">{name}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-muted-foreground text-[11px]">Your Email</span>
               <span className="font-medium text-md ">{email}</span>
            </div>
            <div className="flex flex-col">
               <span className="text-muted-foreground text-[11px]">Status</span>
               <span className="font-medium text-md text-green-500 capitalize">{status}</span>
            </div>
         </div>
         <div className="flex flex-col ">
            <span className="text-muted-foreground text-[11px]">Token</span>
            <span className=" text-[10px] break-all">{idToken}</span>
         </div>
      </div>
   );
};

export default UserInfo;