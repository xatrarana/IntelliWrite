import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { blog_id, user_id }  = data;


        // Check if the saved entry already exists
        const existingSaved = await db.saved.findFirst({
            where: {
                userId: user_id,
                blogId: blog_id,
            },
        });

        if (existingSaved) {
            // If it exists, remove it
            await db.saved.delete({
                where: {
                    id: existingSaved.id, // Use the ID of the existing entry
                },
            });
            return NextResponse.json({ success: true, message: 'Blog removed from saved successfully' });
        } else {
            // If it doesn't exist, create a new entry
            const results = await db.saved.create({
                data: {
                    blogId: blog_id,
                    userId: user_id,
                },
            });
            return NextResponse.json({ success: true, message: 'Blog saved successfully', results });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
