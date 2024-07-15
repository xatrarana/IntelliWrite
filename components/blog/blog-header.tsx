import React from 'react'
import user from '@/assets/default/user.png'
import Image from 'next/image'
import BlogSocial from './blog-social'


type BlogHeaderSectionProps = {
    createdAt?: string
    author?: string
}
const BlogHeaderSection = ({createdAt,author}:BlogHeaderSectionProps) => {
  return (
    <div className='flex items-center justify-between mt-5'>
        <div className='flex gap-x-3'>
            <Image src={user} alt="user" className='rounded-full' width={70} height={70} />
            <div className='space-y-1'>
                    <h4 className='font-semibold'>{author ?? "Chhatra Rana"}</h4>
                    <p className='text-muted-foreground text-sm'>{createdAt ?? "2 days ago"}</p>
            </div>
        </div>

       <BlogSocial/>
    </div>
  )
}

export default BlogHeaderSection