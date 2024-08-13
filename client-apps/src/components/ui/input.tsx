import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prependIcon, appendIcon, error, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="relative flex items-center">
          {prependIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {prependIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-sm border border-input bg-accent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              prependIcon && "pl-10",
              appendIcon && "pr-10",
              error && "border-rose-400",
              className
            )}
            ref={ref}
            {...props}
          />
          {appendIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {appendIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-rose-400 text-[11px] md:text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };