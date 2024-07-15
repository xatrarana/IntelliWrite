import React from 'react'
import { Button } from '../ui/button'
import { FaFacebook, FaTwitter } from 'react-icons/fa'

const BlogSocial = () => {
  return (
    <div className='flex gap-x-5'>
        <Button variant={"outline"}> <FaFacebook/> </Button>
        <Button variant={"outline"}> <FaTwitter/></Button>
    </div>
  )
}

export default BlogSocial