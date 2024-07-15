import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { BlogSchema } from '@/schemas';
import * as z from 'zod';
function createSlug(title:string) {
    // Replace special characters with spaces, then trim and split into words
    const cleanedTitle = title.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
    
    // Split by spaces and join with hyphens
    const slug = cleanedTitle.split(/\s+/).join('-').toLowerCase();
    
    return slug;
}
export async function POST(request: NextRequest) {
    const response = await request.json();

    const blog_sulgname = createSlug(response.title);


    try {


        const newBlog = await db.blog.create({
            data: {
                title : response.title,
                content: response.content,
                authorId: response.authorId,
                image: response.imageUrl,
                blog_slug: blog_sulgname,
                published: true,
                createdAt: new Date(),
            }
        })

        const topic = await db.topic.findFirst({
            where: {
                topic_slug: response.topic
            }
        })

        if (!topic) {
            return new NextResponse(JSON.stringify({ error: "Topic not found" }), {
                status: 404,
            });
        }

        await db.blogTopic.create({
            data: {
                blogId: newBlog.id,
                topicId: topic.id
            }
        })
        return new NextResponse(JSON.stringify({ success: "blog created successfully" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify({ errors: error.errors }), {
                status: 400,
            });
        }

        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });

    }




}