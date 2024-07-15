"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface SignUpButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const SignUpButton = ({
    children,
    mode="redirect",
    asChild
}: SignUpButtonProps) => {
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
        <div onClick={onClick}>{children}</div>
    )
}