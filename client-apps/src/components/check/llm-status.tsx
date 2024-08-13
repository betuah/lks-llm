import { FC } from 'react';
import api from '@/lib/api';

const LLMStatus: FC = () => {

   return (
      <div className="flex justify-between items-center text-sm">
         <span>LLM</span>
         <span className="font-bold text-gray-500 flex items-center">
            {/* <Loader2 className="animate-spin h-4 w-4 mr-2" /> */}
            Loading
         </span>
      </div>
   );
}

export default LLMStatus