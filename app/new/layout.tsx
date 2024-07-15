import { NavBar } from '@/components/navbar/nav'
import React from 'react'

const NewStoryLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <header>
    <NavBar searchBarVissible={false}/>
    </header>
        <main>
          {children}
        </main>
    </>
  )
}

export default NewStoryLayout