"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
interface GetStartedButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
    className?: string;
}

export const GetStartedButton = ({
    children,
    mode="redirect",
    asChild,
    className
}: GetStartedButtonProps) => {
    const router = useRouter();
    
    const onClick = () => {
       

        if(mode === "modal") {
            return (
                <span>Modal Implementation</span>
            );
        }
        router.push("/auth/register");
        
    };
    return (
        <div className={cn(className)} onClick={onClick}>{children}</div>
    )
}