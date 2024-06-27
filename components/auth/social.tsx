"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

export const Social = () => {
  const onClick = (providers: "google" | "github") => {
    signIn(providers, { callbackUrl: DEFAULT_LOGIN_REDIRECT_URL });
  }
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button size={"lg"} variant={"outline"} onClick={() => onClick("google")}>
        <FcGoogle className="h-7 w-7" />
      </Button>
      <Button size={"lg"} variant={"outline"} onClick={() => onClick("github")}>
        <FaGithub className="h-7 w-7" />
      </Button>
    </div>
  );
};
