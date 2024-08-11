import React from 'react';
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface StatusIndicatorProps {
   endpoint: string;
   status: string | null;
   isLoading: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
   endpoint,
   status,
   isLoading,
}) => {
   let statusColor = "text-gray-500";
   let StatusIcon = Loader2;

   if (status === "OK") {
      statusColor = "text-green-500";
      StatusIcon = CheckCircle2;
   } else if (status === "Failed" || status === "Error") {
      statusColor = "text-red-500";
      StatusIcon = XCircle;
   }

   return (
      <div className="flex justify-between items-center text-sm">
         <span>{endpoint}</span>
         <span className={`font-bold ${statusColor} flex items-center`}>
            {isLoading ? (
               <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
               <>
                  {status}
                  {status && <StatusIcon className="ml-2 h-4 w-4" />}
               </>
            )}
         </span>
      </div>
   );
};

export default StatusIndicator;