import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { topic } = await request.json();
    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
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
            return NextResponse.json({ success: false, message: 'Topic not found' });
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

        return NextResponse.json({ success: true, topic: isExistTopic, blogs });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
