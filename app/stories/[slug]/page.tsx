import BlogDetailsWrapper from '@/components/blog/blog-details-wrapper'
import { db } from '@/lib/db'
import { Blog, User } from '@prisma/client'
import React from 'react'

const BlogDetails = async ({params}:{params: {slug:string}}) => {

    const blog = await db.blog.findFirst({
        where: {
            blog_slug: params.slug as string
        },
        include:{
            
            author:{
                select:{
                    username:true,
                    image:true
                }
            
            }
        }
    })
  return (
   <BlogDetailsWrapper blog={blog as Blog}/>
  )
}

export default BlogDetails