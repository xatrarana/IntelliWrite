import { FeedWrapper } from '@/components/home/feed/feed-wrapper'
import { db } from '@/lib/db'
import React from 'react'

type ShowBlogSideBarProps = {
  username: string
}
const ShowBlogSideBar = async ({username}:ShowBlogSideBarProps) => {
  const user = await db.user.findUnique({
    where: {
      username: username
    }
  })
  const blog = await db.blog.findMany({
    where: {
      authorId: user?.id
    }
  })

  
  return (
    <div className='no-scrollbar overflow-y-hidden h-[100vh]'>

     {
        blog.length === 0 && (
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-xl text-muted-foreground'>No Blogs Found</h1>
          </div>
        )
     }
     {
        blog.length > 0 && (
          <FeedWrapper blogs={blog}/>
        )
     }
    </div>
  )
}

export default ShowBlogSideBar