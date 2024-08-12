"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
   const { theme = "system" } = useTheme();

   return (
      <Sonner
         theme={theme as ToasterProps["theme"]}
         className="toaster group"
         toastOptions={{
            //   unstyled: true,
            classNames: {
               toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-primary group-[.toaster]:shadow-lg",
               description: "group-[.toast]:text-muted-foreground",
               actionButton:
                  "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
               cancelButton:
                  "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",

               // toast: "flex items-center p-4 w-full border border-primary rounded-sm  shadow-lg gap-2 bg-background text-[12px] font-normal",
               // description: "text-muted-foreground",
               // actionButton: "bg-primary text-primary-foreground",
               // cancelButton: "bg-muted text-muted-foreground",
               // closeButton: "bg-lime-400",
               // error: "border border-rose-400 bg-rose-400/10 text-rose-400",
               // success: "border border-emerald-400 bg-emerald-400/10 text-emerald-400",
               // warning: "border border-orange-400 bg-orange-400/10 text-orange-400",
               // info: "bg-blue-400",
            },
         }}
         {...props}
      />
   );
};

export { Toaster };
