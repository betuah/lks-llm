import Link from "next/link";

const NotFound = () => {
   return (
      <div className="flex items-center justify-center h-screen w-full max-w-md mx-auto text-center">
         <div className="flex flex-col p-5 bg-accent shadow-md shadow-accent rounded-lg border border-primary">
            <span className="font-bold text-[20px] text-primary">
               404 - Page Not Found!
            </span>
            <span className="text-[11px] mt-3">
               Don&apos;t worry, we&apos;ve got your back! This page must have gone on an adventure and gotten lost. Let&apos;s get you back on track <Link href="/" className="font-bold text-primary">Here</Link>
            </span>
         </div>
      </div>
   );
};

export default NotFound;
