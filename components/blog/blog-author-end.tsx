import React from 'react'

import Image, { StaticImageData } from 'next/image'
import user from "@/assets/default/user.png"


type BlogAuthorEndSectionProps = {
    authorname: string,
    authoravatar: string | StaticImageData
}
const BlogAuthorEndSection = ({authorname,authoravatar}: BlogAuthorEndSectionProps) => {
  return (
    <div className='flex items-center gap-3'>
        <div>
            <Image src={user} alt='author' className='rounded-full' width={100} height={100}/>
        </div>
        <div>
            <article className='text-sm text-gray-800'>
                <span className='text-xl font-semibold'>{authorname ?? "Chhatra Rana "}</span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, nobis voluptatum doloremque quibusdam reprehenderit ea nam a sint, nemo cumque ut iure molestiae ipsam rem. Dolores nobis ab dolorum laborum!
            </article>
        </div>
    </div>
  )
}

export default BlogAuthorEndSection