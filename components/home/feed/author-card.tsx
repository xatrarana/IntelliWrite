"use client";
import user from "@/assets/default/user.png";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AuthorCard = ({
  authorAvatra,
  authorUsername,
}: {
  authorAvatra: string;
  authorUsername: string;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar>
        <AvatarImage src={authorAvatra ?? user} />
        <AvatarFallback>
            {authorUsername.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <HoverCard>
          
        <HoverCardTrigger>
            {authorUsername}
        </HoverCardTrigger>
        <HoverCardContent>
            <Link
            href={`/profile/${authorUsername}`}
            className="text-sm font-semibold hover:underline"
          >{authorUsername}
          </Link>
          </HoverCardContent>
      </HoverCard>
    </div>
  );
};
