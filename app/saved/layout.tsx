import { NavBar } from '@/components/navbar/nav'
import React from 'react'

const SavedLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <header>
    <NavBar createBlogButtonVissible  searchBarVissible={true}/>
    </header>
        <main>
          {children}
        </main>
    </>
  )
}

export default SavedLayout