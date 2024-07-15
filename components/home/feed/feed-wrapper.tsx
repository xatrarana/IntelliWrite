import { db } from "@/lib/db";
import { BlogCardWrapper } from "./blog-card";
import { BlogWrapper } from "./blog-wrapper";
import { Blog } from "@prisma/client";

type FeedWrapperProps = {
    blogs: Blog[]
}
export const FeedWrapper = async ({blogs}:FeedWrapperProps) => {


    return (
       <div className="flex no-scrollbar flex-col gap-y-5 h-full overflow-scroll" suppressHydrationWarning>
       {
        blogs.map((blog, index) => (
            <BlogCardWrapper authorId={blog.authorId} key={index}>
                <BlogWrapper blog={blog}/>
            </BlogCardWrapper>
        ))
       }
       </div>
    );
}