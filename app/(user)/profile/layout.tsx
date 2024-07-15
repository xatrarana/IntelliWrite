import { NavBar } from '@/components/navbar/nav'

import React from 'react'
import SideBarComp from './_sidebar'

const ProfileLayout = ({children, params}:{children: React.ReactNode, params: string}) => {
  return (
    <>
        <header>
            <NavBar/>
        </header>
        {
          children
        }
    </>
  )
}

export default ProfileLayout