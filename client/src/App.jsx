import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Patients from './pages/Patients'
import About from './pages/About'
import NavBar from './components/NavBar'

export default function App(){
  return (
    <BrowserRouter>
      <div className='min-h-screen'>
        <NavBar />
        <main className='p-4 max-w-6xl mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/patients' element={<Patients />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
