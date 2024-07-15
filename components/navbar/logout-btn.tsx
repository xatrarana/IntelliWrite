import React from 'react'
import { Button } from '../ui/button';
import { signOut } from '@/auth';

const LogOutBtn = async() => {
  return (
    <form action={async() => {
        "use server";
        await signOut({redirectTo: "/auth/login"});
    }}>
        <Button variant={"outline"} className='w-full mt-5' type="submit">Logout</Button>
    </form>
  )
}

export default LogOutBtn