"use server";
import { db } from "@/lib/db";

export async function getBlogWithTopics(topic: string){
    if (!topic) {
        return { error: 'Topic is required' };
    }
    const topicSlug = topic.toLowerCase().replace(/\s/g, '-');

    try {
        // Check if the topic exists
        const isExistTopic = await db.topic.findFirst({
            where: {
                topic_slug: topicSlug
            }
        });

        if (!isExistTopic) {
            return { success: false, message: 'Topic not found' };
        }

        // Fetch blogs related to the topic
        const blogs = await db.blog.findMany({
            where: {
                topics: {
                    some: {
                        topicId: isExistTopic.id
                    }
                }
            },
            include: {
                author: true, // Assuming you want to include the author's details
                topics: {
                    include: {
                        topic: true
                    }
                }
            }
        });

        return { success: true, topic: isExistTopic, blogs };
    } catch (error) {
        console.error('Error processing request:', error);
        return { error: 'Internal Server Error' };
    }
}