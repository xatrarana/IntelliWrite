import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const topics = await db.topic.findMany()
        return NextResponse.json({scuccess:true,topics});
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const { topic } = await req.json();
    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const topicSlug = topic.toLowerCase().replace(/\s/g, '-');

    try {
        // Check if the topic already exists
        const existingTopic = await db.topic.findFirst({
            where: {
                topic_slug: topicSlug,
            },
        });

        if (existingTopic) {
            // If the topic exists, return a message or the existing topic
            return NextResponse.json({ success: true, topic: existingTopic });
        }

        // Create the new topic if it does not exist
        const newTopic = await db.topic.create({
            data: {
                title: topic,
                topic_slug: topicSlug,
            }
        });

        return NextResponse.json({ success: true, topic: newTopic });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
