import {
  BiSolidHot,
  BiSolidMessageRounded,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import BookMarkButton from "./book-mark-btn";
import { Blog } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import LikeButton from "./like-btn";


export const BlogButtonsComponents = async ({ blog }: { blog: Blog }) => {
  const session = await auth();

  const isBlogSaved = !!(await db.saved.findFirst({
    where: {
      blogId: blog.id,
      userId: session?.user.id as string,
    },
  }));

  const isBlogLiked = !!(await db.like.findFirst({
    where: {
      blogId: blog.id,
      userId: session?.user.id as string,
    },
  }));

  const blogLikedCount = await db.like.count({
    where: {
      blogId: blog.id,
    },
  });

  return (
    <div className="grid grid-cols-2 gap-x-5">
      <div className="col-span-1 place-content-start flex items-center gap-x-10 justify-between">
          <span className="text-sm text-muted-foreground cursor-pointer">
            Jun 4
          </span>
        <div className="cursor-pointer">
         
            <LikeButton
              blogId={blog.id}
              LikeCount={blogLikedCount}
              userId={session?.user.id as string}
              IsLiked={isBlogLiked}
           />
              
        </div>
        <div className="cursor-pointer">
          <div className="flex gap-x-2 items-center">
            <BiSolidMessageRounded fontSize={25} className="text-gray-500" />
            <span className="text-muted-foreground">43</span>
          </div>
        </div>
      </div>

      <div className="col-span-1 place-content-end flex items-center gap-x-5">
        <BookMarkButton
          IsSaved={isBlogSaved}
          blogId={blog.id}
          userId={session?.user.id as string}
        />
        <BiDotsHorizontalRounded
          fontSize={30}
          className="text-gray-500 hover:text-gray-800 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BlogButtonsComponents;
