import React from 'react'

export default function PatientCard({p, onView}){
  return (
    <div className='bg-white rounded-xl shadow p-4 flex flex-col justify-between'>
      <div>
        <h3 className='text-lg font-semibold'>{p.name}</h3>
        <p className='text-sm text-gray-600'>Age: {p.age}</p>
        <p className='text-sm text-gray-600'>Contact: {p.contact}</p>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={()=>onView(p)} className='px-3 py-1 bg-indigo-600 text-white rounded'>View Details</button>
      </div>
    </div>
  )
}
