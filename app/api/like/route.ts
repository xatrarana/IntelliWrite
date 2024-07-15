// import { db } from "@/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     try {
//         const data = await request.json();
//         const { blog_id, user_id } = data;

//         // Check if the like entry already exists
//         const existingLike = await db.like.findFirst({
//             where: {
//                 blogId: blog_id,
//                 userId: user_id,
//             },
//         });

//         if (existingLike) {
//             // Verify that the userId matches before deleting
//             if (existingLike.userId !== user_id) {
//                 return NextResponse.json({ success: false, message: 'You are not authorized to remove this like' }, { status: 403 });
//             }

//             // If the userId matches, remove the like
//             await db.like.delete({
//                 where: {
//                     id: existingLike.id, // Use the ID of the existing entry
//                 },
//             });
//             return NextResponse.json({ success: true, message: 'Blog like removed successfully' ,count:existingLike});
//         } else {
//             // If the like doesn't exist, create a new entry
//             const results = await db.like.create({
//                 data: {
//                     blogId: blog_id,
//                     userId: user_id, // Ensure the userId is correctly assigned here
//                 },
//             });
//             return NextResponse.json({ success: true, message: 'Blog liked successfully', results });
//         }

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { blog_id, user_id } = data;

        // Check if the like entry already exists
        const existingLike = await db.like.findFirst({
            where: {
                blogId: blog_id,
                userId: user_id,
            },
        });

        if (existingLike) {
            // Verify that the userId matches before deleting
            if (existingLike.userId !== user_id) {
                return NextResponse.json({ success: false, message: 'You are not authorized to remove this like' }, { status: 403 });
            }

            // If the userId matches, remove the like
            await db.like.delete({
                where: {
                    id: existingLike.id, // Use the ID of the existing entry
                },
            });

            // Return the updated like count
            const likeCount = await db.like.count({
                where: {
                    blogId: blog_id,
                },
            });
            return NextResponse.json({ success: true, message: 'Blog like removed successfully', likeCount });
        } else {
            // If the like doesn't exist, create a new entry
            await db.like.create({
                data: {
                    blogId: blog_id,
                    userId: user_id, // Ensure the userId is correctly assigned here
                },
            });

            // Return the updated like count
            const likeCount = await db.like.count({
                where: {
                    blogId: blog_id,
                },
            });
            return NextResponse.json({ success: true, message: 'Blog liked successfully', likeCount });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
