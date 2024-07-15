import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";
import { SignUpButton } from "../auth/signup-button";
import { Button } from "../ui/button";
import { LoginButton } from "../auth/login-button";
import { ProfileWrapper } from "./profile-wrapper";
import Link from "next/link";
import SearchBar from "./search-bar";
import { auth } from "@/auth";
import { CreateBlogButton } from "./create-blog-button";
import { TfiWrite } from "react-icons/tfi";

const font = Playfair_Display({ subsets: ["latin"] });

type NavBarProps = {
  searchBarVissible?: boolean;
  createBlogButtonVissible?: boolean;
}

export const NavBar = async ({searchBarVissible = true,createBlogButtonVissible = false}: NavBarProps) => {
  const session = await auth();
  return (
    <nav className="grid grid-cols-2 px-10">
      <div className="flex items-center gap-x-5 py-2">
        <Link href={"/"}>
          {" "}
          <h1 className={cn("font-bold text-3xl", font.className)}>
            IntelliWrite
          </h1>
        </Link>

        {session && <SearchBar IsVissible={searchBarVissible} />}
        
      </div>
      <div className="flex items-center justify-end gap-x-3">
        
        {
          createBlogButtonVissible && <CreateBlogButton mode="redirect"><Button variant={"outline"}><TfiWrite /></Button></CreateBlogButton>
        }
        {!session && (
          <>
            <SignUpButton>
              <Button className="rounded-full text-md" variant={"default"}>
                Sign up
              </Button>
            </SignUpButton>
            <LoginButton>
              <Button className="rounded-lg text-md" variant={"ghost"}>
                Sign in
              </Button>
            </LoginButton>
          </>
        )}
        {session && <ProfileWrapper />}
      </div>
    </nav>
  );
};
