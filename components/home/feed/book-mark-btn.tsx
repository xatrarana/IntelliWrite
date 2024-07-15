"use client";
import { Button } from '@/components/ui/button';
import instance from '@/lib/axios';
import React, { useId } from 'react'
import { BiBookmarkPlus } from 'react-icons/bi';
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";

type BookMarkButtonProps = {
    userId: string,
    blogId: string,
    IsSaved: boolean
}
const BookMarkButton = ({userId,blogId,IsSaved}:BookMarkButtonProps) => {
    const [saved, setSaved] = React.useState(IsSaved)


    const handleBookMark = async () => {
        const data = {
            blog_id: blogId,
            user_id: userId
        }
        try {

           const response =  await instance.post("/api/saved",data,{
                headers:{
                    "Content-Type":"application/json"
                }
            
            })
            setSaved(!saved)
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <div onClick={handleBookMark}>
       {
        saved && <MdLibraryAddCheck fontSize={25} className="text-gray-800 cursor-pointer" /> 
       }
       {
        !saved && <MdLibraryAdd fontSize={25} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
       }
    </div>
  )
}

export default BookMarkButton