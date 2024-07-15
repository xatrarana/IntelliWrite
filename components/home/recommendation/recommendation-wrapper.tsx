import { db } from "@/lib/db"
import Link from "next/link"

export const RecommendationWrapper = async() => {
    const topics = await db.topic.findMany()
    return (
            <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                    <Link href={`/stories/topic/${topic.topic_slug}`} key={topic.id} className="px-3 text-muted-foreground bg-gray-100 text-gray-800 rounded-full cursor-pointer hover:bg-gray-300">{topic.title}</Link>
                ))}
            </div>
    )
}