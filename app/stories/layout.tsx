import { NavBar } from '@/components/navbar/nav'
import React from 'react'

const BlogLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
        <NavBar/>
        {
            children
        }
    </div>
  )
}

export default BlogLayout