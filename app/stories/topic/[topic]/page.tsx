import { getBlogWithTopics } from "@/actions/blog-with-topic";
import { BlogCardWrapper } from "@/components/home/feed/blog-card";
import { BlogWrapper } from "@/components/home/feed/blog-wrapper";
import instance from "@/lib/axios";
import { BlogTopic } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const StoryBasedOnTopic = async ({ params }: { params: { topic: string } }) => {
  console.log(params.topic);

  const response = await getBlogWithTopics(params.topic);
  console.log(response);

  return (
    <div className="max-w-6xl mx-auto mt-5 p-3 space-y-3">
      <h1 className="text-xl font-semibold">Stories based on topic <span className="text-3xl font-semibold">&#34{params.topic}&#34</span></h1>
      <div>
        {response.blogs &&
          response.blogs.map((blog: any) => {
            return (
              <BlogCardWrapper authorId={blog.authorId} key={blog.id}>
                <BlogWrapper blog={blog} />
              </BlogCardWrapper>
            );
          })}
      </div>
    </div>
  );
};

export default StoryBasedOnTopic;
