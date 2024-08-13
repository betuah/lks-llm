"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

type DrawerDirection = "right" | "left" | "bottom";

const Drawer = ({
   shouldScaleBackground = true,
   direction = "bottom",
   children,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & { direction?: DrawerDirection }) => (
   <DrawerPrimitive.Root
      shouldScaleBackground={direction === "bottom" && shouldScaleBackground}
      {...props}
   >
      {React.Children.map(children, child => 
         React.isValidElement(child) 
            ? React.cloneElement(child, { direction } as any) 
            : child
      )}
   </DrawerPrimitive.Root>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Overlay>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Overlay
      ref={ref}
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
   />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
   direction?: DrawerDirection;
}

const DrawerContent = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Content>,
   DrawerContentProps
>(({ className, children, direction, ...props }, ref) => (
   <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
         ref={ref}
         className={cn(
            "fixed z-50 flex flex-col bg-background",
            direction === "bottom" && "inset-x-0 bottom-0 rounded-t-[10px] border-t",
            direction === "right" && "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            direction === "left" && "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            direction === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            direction === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            direction === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            className
         )}
         data-direction={direction}
         {...props}
      >
         {direction === "bottom" && (
            <div className="mx-auto mt-4 h-1 w-[100px] rounded-full bg-gray-500" />
         )}
         {children}
      </DrawerPrimitive.Content>
   </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
   />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
   />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Title>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Title
      ref={ref}
      className={cn(
         "text-lg font-semibold leading-none tracking-tight",
         className
      )}
      {...props}
   />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
   React.ElementRef<typeof DrawerPrimitive.Description>,
   React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
   <DrawerPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
   />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
   Drawer,
   DrawerPortal,
   DrawerOverlay,
   DrawerTrigger,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerFooter,
   DrawerTitle,
   DrawerDescription,
};
