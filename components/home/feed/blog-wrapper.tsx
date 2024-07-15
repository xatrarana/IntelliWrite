import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import BlogButtonsComponents from "./blog-buttons";
import { Blog } from "@prisma/client";
import TruncateContent from "./truncate-component";
import Link from "next/link";
import { Suspense } from "react";

const font = Playfair_Display({ subsets: ["latin"] });

type BlogWrapperProps = {
  blog: Blog;
};
export const BlogWrapper = ({ blog }: BlogWrapperProps) => {
  return (
    <div className="grid grid-cols-3 gap-3" suppressHydrationWarning>
      <div className="col-span-2">
        <div className="mx-1 mt-2">
          <Link  href={`/stories/${blog.blog_slug as string}`}>
            <div className="m-1">
              <h1 className={cn("text-3xl font-bold", font.className)}>
                {blog.title}
              </h1>
            </div>
            <TruncateContent content={blog.content} maxWords={25} />
          </Link>
        </div>
        <div className="mt-2  p-1">
            <BlogButtonsComponents blog={blog} />
        </div>
      </div>
      <div className="col-span-1 place-content-center">
       <Image
        alt={blog.title}
        src={blog.image as string}
        width={200}
        height={200}
       />
      </div>
    </div>
  );
};
