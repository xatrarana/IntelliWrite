import React from "react";
import BlogHeaderSection from "./blog-header";
import BlogAuthorEndSection from "./blog-author-end";
import user from "@/assets/default/user.png";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Blog } from "@prisma/client";

type BlogDetailsWrapperProps = {
    blog: any
}
const BlogDetailsWrapper = ({blog}: BlogDetailsWrapperProps) => {
  return (
    <div className="max-w-5xl mx-auto p-3">
      <BlogHeaderSection createdAt={blog?.createdAt?.toString()} author={blog.author.username}/>
    <Separator className="mt-2"/>

<h1 className="text-3xl font-bold my-3">{blog.title}</h1>
    <div className="flex items-center justify-center p-1">
      <Image
      src={blog.image}
      alt={blog.title}
      width={800}
      height={200}
      loading="lazy"

      />
    </div>
        <div id="ElementContainer" className="p-3" dangerouslySetInnerHTML={{__html:blog.content as HTMLElement}}>
           
        </div>
     

        <Separator/>
     <BlogAuthorEndSection authorname="Chhatra Rana" authoravatar={user}/>
    </div>
  );
};

export default BlogDetailsWrapper;
