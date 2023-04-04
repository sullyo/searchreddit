import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  IconButton?: React.ReactNode;
  clearable?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, IconButton, clearable, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value || "");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (props.onChange) props.onChange(event);
    };

    const handleClearClick = () => {
      setValue("");
    };

    return (
      <div className="relative">
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-zinc-300 bg-transparent py-2 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-zinc-50 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900",
            className
          )}
          ref={ref}
          {...props}
          value={value}
          onChange={handleInputChange}
        />
        {IconButton && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {IconButton}
          </div>
        )}
        {clearable && value && (
          <>
            <button
              type="button"
              onClick={handleClearClick}
              className="absolute inset-y-3 right-[3rem] mr-2 flex items-center  border-r border-zinc-300 pr-2 dark:border-zinc-50"
            >
              <Icons.x className="h-5 w-5 text-sky-900 dark:text-sky-50" />
            </button>
          </>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
