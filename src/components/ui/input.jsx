import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ Icon, className, type, ...props }, ref) => {
  return (
    <div className={cn("w-full", className, Icon && "relative")}>
      {Icon && (
        <Icon className="absolute top-0 left-0 size-10 p-2.5 text-muted-foreground" />
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-10"
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
