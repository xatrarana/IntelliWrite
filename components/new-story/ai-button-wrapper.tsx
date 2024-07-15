"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface AiHelperButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const AiHelperButton = ({
  children,
  mode = "redirect",
  asChild,
}: AiHelperButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    if (mode === "modal") {
      return (
        <span> modal not implemented</span>
      );
    }
  };
  return <div onClick={onClick}>{children}</div>;
};
