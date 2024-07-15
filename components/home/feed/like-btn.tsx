"use client";
import instance from "@/lib/axios";
import { set } from "lodash";
import React from "react";
import { BiSolidHot } from "react-icons/bi";

type LikeButtonProps = {
  userId: string;
  blogId: string;
  LikeCount: number;
  IsLiked: boolean;
};
const LikeButton = ({
  userId,
  IsLiked,
  blogId,
  LikeCount,
}: LikeButtonProps) => {
  const [liked, setLiked] = React.useState(IsLiked);
  const [likeCount, setLikeCount] = React.useState(LikeCount);
  const handleBookMark = async () => {
    const data = {
      blog_id: blogId,
      user_id: userId,
    };
    try {
      setLiked(!liked);
      const response = await instance.post("/api/like", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLikeCount(response.data.likeCount)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-x-2 items-center">
      <div onClick={handleBookMark}>
        {liked && <BiSolidHot fontSize={25} className="text-red-500" />}
        {!liked && <BiSolidHot fontSize={25} className="text-gray-500 " />}
      </div>
      <span className="text-muted-foreground">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
