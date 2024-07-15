import { auth } from "@/auth";
import { FeedWrapper } from "@/components/home/feed/feed-wrapper";
import { db } from "@/lib/db";
import React from "react";

const SavedPage = async () => {
  const session = await auth();
  const saved = await db.saved.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const blogIds = saved.map((s) => s.blogId);

  // Fetch only the blogs that are saved by the user
  const blogs = await db.blog.findMany({
    where: {
      id: { in: blogIds },
    },
  });
  return (
    <div className="max-w-6xl mx-auto p-2 mt-1">
      <h1 className="text-3xl font-bold">Saved Stories</h1>

      <div className="mt-5">
        <FeedWrapper blogs={blogs} />

        {blogs.length === 0 && (
          <div className="mt-5">
            <h1 className="text-md font-semibold text-muted-foreground">No stories saved yet</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
