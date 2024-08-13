'use client';

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const { data: session, status } = useSession();
  const name = session?.user?.name ?? "";
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-full text-center">
        <div className="flex flex-col items-center gap-3 p-5 bg-accent shadow-md shadow-accent rounded-lg border border-primary w-full max-w-[400px]">
          <Skeleton className="h-3 w-full bg-accent" />
          <Skeleton className="h-2 w-[70%] bg-accent" />
          <Skeleton className="h-8 w-[50%] rounded-sm bg-accent" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-full text-center">
      <div className="flex flex-col p-5 bg-accent shadow-md shadow-accent rounded-lg border border-primary w-full max-w-[400px]">
        <span className="font-bold text-[23px] text-primary">Hello <span className="text-rose-400">{name}</span>,{status === "authenticated" ? <br /> : " "} Congratulations ! 🥳 </span>
        <span className="text-[13px]">If you see this, your app is working.</span>
        <div className="flex mt-5 mb-2">
          {
            status === "authenticated" ? 
              (
                <div className="flex flex-col gap-2 mx-auto w-[60%]">
                  <Button variant={"default"} className="text-[13px] font-bold h-8 mx-auto w-full rounded-[8px]" onClick={() => router.push("/sofya")}>Go to Apps</Button>
                  <Button variant={"outline"} className="text-[13px] font-bold h-8 mx-auto w-full rounded-[8px]" onClick={() => router.push("/check")}>Check Status</Button>
                </div>
              )
            : 
            <Button variant={"default"} className="text-[13px] font-bold h-8 mx-auto rounded-[8px]" onClick={() => router.push("/signin")}>Sign In Here</Button>
          }
        </div>
      </div>
    </div>
  )
}

export default Home