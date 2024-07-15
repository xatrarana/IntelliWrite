import React from 'react'
import { NavBar } from '../navbar/nav'
import ParticleDesgin from '../design/design'

const UnAuthenticatedLayout = () => {
  return (
    <>
    <header>
    <NavBar/>
    </header>
        <main>
          <ParticleDesgin />
        </main>
    </>
  )
}

export default UnAuthenticatedLayout