"use client";
import { useRouter } from "next/navigation";
interface PublishButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const PublishButton = ({
    children,
    mode="redirect",
    asChild
}: PublishButtonProps) => {
    const router = useRouter();
    
    const onClick = () => {
       

        if(mode === "modal") {
            return (
                <span>Modal Implementation</span>
            );
        }
        router.push("/auth/login");
        
    };
    return (
        <div onClick={onClick}>{children}</div>
    )
}