"use client";

import { useRouter } from "next/navigation";
interface CreateBlogButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const CreateBlogButton = ({
    children,
    mode="redirect",
    asChild
}: CreateBlogButtonProps) => {
    const router = useRouter();
    
    const onClick = () => {
       

        if(mode === "modal") {
            return (
                <span>Modal Implementation</span>
            );
        }
        router.push("/new");
        
    };
    return (
        <div onClick={onClick}>{children}</div>
    )
}