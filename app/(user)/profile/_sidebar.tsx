import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import userPng from "@/assets/default/user.png";
import React from 'react'
import { User } from '@prisma/client';
import { db } from '@/lib/db';

const SideBarComp = async({userId}:{userId: string}) => {

  const user = await db.user.findUnique({
    where: {
      username: userId,
    },
  })

  return (
    <aside className='col-span-4  sticky mt-5 flex flex-col items-center gap-y-5'>
    <div>
      <picture className='rounded-full'>
        <Image className='rounded-full' width={100} height={100} src={user?.image as string ?? userPng} alt='profile'/>
      </picture>
    </div>
    <div>
      <h1>{user?.username}</h1>
    </div>
    <div className='flex items-center justify-around gap-x-5'>
      <div><span className=' px-3 py-2 text-black rounded-md'>65k Followers</span></div>
      <div><Button>subscribe</Button></div>
    </div>
</aside>
  )
}

export default SideBarComp