import Image from "next/image";
import userDefa from "@/assets/default/user.png";
import { FaCog, FaFileAlt, FaHeart, FaInfo, FaUserAlt } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Label } from "../ui/label";
import { auth } from "@/auth";
import { Separator } from "../ui/separator";
import LogOutBtn from "./logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";

export const ProfileWrapper = async () => {
  const session = await auth();
  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    }
  })
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar>
          <AvatarImage src={(user?.image as string) ?? userDefa} />
          <AvatarFallback>
            {user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{user?.email}</SheetTitle>
          <SheetDescription>{user?.name}</SheetDescription>
          <Separator />
        </SheetHeader>
        <div className="mt-5 flex flex-col h-full">
          <ul className="flex flex-col gap-y-3 flex-grow">
            <Link href={`/profile/${user?.username}`}>
              <li className="flex gap-x-5 items-center cursor-pointer group p-3">
                <FaUserAlt className="text-slate-500 group-hover:text-slate-700" />
                <Label className="text-md text-slate-500 cursor-pointer font-normal group-hover:text-slate-700">
                  Profile
                </Label>
              </li>
            </Link>

            {/* <Link href={`/profile/${user?.username}/stories`}>
              <li className="flex gap-x-5 items-center cursor-pointer group p-3">
                <FaFileAlt className="text-slate-500 group-hover:text-slate-700" />
                <Label className="text-md text-slate-500 cursor-pointer font-normal group-hover:text-slate-700">
                  Blogs
                </Label>
              </li>
            </Link> */}
            <Link href="/saved">
              <li className="flex gap-x-5 items-center cursor-pointer group p-3">
                <FaHeart className="text-slate-500 group-hover:text-slate-700" />
                <Label className="text-md text-slate-500 cursor-pointer font-normal group-hover:text-slate-700">
                  Saved
                </Label>
              </li>
            </Link>
            <Link href="/settings">
              <li className="flex gap-x-5 items-center cursor-pointer group p-3">
                <FaCog className="text-slate-500 group-hover:text-slate-700" />
                <Label className="text-md text-slate-500 cursor-pointer font-normal group-hover:text-slate-700">
                  Settings
                </Label>
              </li>
            </Link>

            <LogOutBtn />
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
