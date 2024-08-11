import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import StatusIndicator from './status';

interface ApiStatusType {
   [key: string]: {
      status: string | null;
      isLoading: boolean;
   };
}

interface Endpoint {
   name: string;
   url: string;
   method: "GET" | "POST" | "PUT" | "DELETE";
   body?: object;
}

interface ApiStatusProps {
   endpoints: Endpoint[];
}

const ApiStatus: React.FC<ApiStatusProps> = ({ endpoints }) => {
   const [isChecking, setIsChecking] = useState(false);
   const [apiStatus, setApiStatus] = useState<ApiStatusType>({});

   const checkApiStatus = async () => {
      setIsChecking(true);
      const newStatus: ApiStatusType = {};
      endpoints.forEach(
         (endpoint) =>
            (newStatus[endpoint.name] = { status: null, isLoading: true })
      );
      setApiStatus(newStatus);

      for (const endpoint of endpoints) {
         try {
            let response;

            switch (endpoint.method) {
               case "GET":
                  response = await api.get(endpoint.url);
                  break;
            
               case "POST":
                  response = await api.post(endpoint.url, endpoint.body);
                  break;

               case "PUT":
                  response = await api.put(endpoint.url, endpoint.body);
                  break;
               
               case "DELETE":
                  response = await api.delete(endpoint.url);
                  break;

               default:
                  throw new Error("Unsupported method");
            }

            setApiStatus((prev) => ({
               ...prev,
               [endpoint.name]: {
                  status: "OK",
                  isLoading: false,
               },
            }));
         } catch (error) {
            setApiStatus((prev) => ({
               ...prev,
               [endpoint.name]: {
                  status: "Error",
                  isLoading: false,
               },
            }));
         }
      }

      setIsChecking(false);
   };

   return (
      <div className="flex flex-col gap-2 p-4 rounded-lg border-2 border-primary w-full bg-accent">
         <div className="flex justify-between items-center">
            <span className='font-bold'>Check API Endpoint Status</span>
            <div>
               <Button
                  variant={"default"}
                  className="w-full text-[13px] font-medium text-primary-foreground h-7 rounded-[8px] gap-2"
                  onClick={checkApiStatus}
                  disabled={isChecking}
               >
                  {isChecking ? (
                     <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Check
               </Button>
            </div>
         </div>
         <div className="flex flex-col gap-2 mt-2 border-2 border-t-gray-400 py-4">
            {endpoints.map((endpoint) => (
               <StatusIndicator
                  key={endpoint.name}
                  endpoint={endpoint.name}
                  status={apiStatus[endpoint.name]?.status || null}
                  isLoading={apiStatus[endpoint.name]?.isLoading || false}
               />
            ))}
         </div>
      </div>
   );
};

export default ApiStatus;