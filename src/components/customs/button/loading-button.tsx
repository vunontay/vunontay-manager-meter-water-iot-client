import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export const LoadingButton = React.forwardRef<
    HTMLButtonElement,
    LoadingButtonProps
>(({ className, children, isLoading, ...props }, ref) => {
    return (
        <Button
            className={cn("relative", className)}
            disabled={isLoading}
            ref={ref}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
});

LoadingButton.displayName = "LoadingButton";
