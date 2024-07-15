import { auth } from '@/auth'
import { UserNameForm } from '@/components/auth/user-name-form'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const UserNamePage = async () => {
  const session = await auth()

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id as string
    }
  })

  if(user?.username) return redirect('/')
  
  if(user?.IsFirstLogin) return redirect('/feed-settings')
  return (
    <UserNameForm/>
  )
}

export default UserNamePage