import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className='text-center py-20'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to Jarurat Care</h1>
      <p className='mb-6 max-w-2xl mx-auto'>Jarurat Care is a platform for managing patient records.
        It helps healthcare providers securely store and access patient information.
        The system reduces paperwork and improves hospital efficiency.
        Doctors can track medical history, treatments, and appointments easily.
        Jarurat Care ensures data privacy and better patient care.</p>
      <Link to='/patients' className='px-4 py-2 bg-indigo-600 text-white rounded'>View Patients</Link>
    </section>
  )
}
