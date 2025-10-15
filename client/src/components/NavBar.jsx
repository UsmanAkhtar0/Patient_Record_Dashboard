import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar(){
  const loc = useLocation();
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <div className='text-2xl font-bold text-indigo-600'>Jarurat Care</div>
        </div>
        <nav className='space-x-4'>
          <Link className={'hover:underline '+(loc.pathname==='/'?'font-semibold':'')} to='/'>Home</Link>
          <Link className={'hover:underline '+(loc.pathname==='/patients'?'font-semibold':'')} to='/patients'>Patients</Link>
          <Link className={'hover:underline '+(loc.pathname==='/about'?'font-semibold':'')} to='/about'>About</Link>
        </nav>
      </div>
    </header>
  )
}
