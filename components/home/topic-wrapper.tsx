import instance from "@/lib/axios";
import { db } from "@/lib/db";
import Link from "next/link";
import { useEffect, useState } from "react";

type Topic = {
  id: string;
  title: string;
  topic_slug: string;
};
export const TopicWrapper = async () => {
  const topics = await db.topic.findMany()
  return (
    <div className="no-scrollbar flex gap-2 py-2 px-4">
      {topics &&
        topics.map((topic) => (
          <Link
            href={`/stories/topic?query=${topic.topic_slug}`}
            key={topic.id}
            className="px-2 py-1 bg-white text-gray-800 rounded-full cursor-pointer hover:bg-gray-300"
          >
            {topic.title}
          </Link>
        ))}
    </div>
  );
};
