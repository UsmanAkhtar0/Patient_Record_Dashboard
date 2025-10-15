import React, { useEffect, useState } from 'react'
import PatientCard from '../components/PatientCard'

function Modal({ patient, onClose }) {
  if (!patient) return null;
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
      <div className='bg-white p-6 rounded max-w-md w-full'>
        <h3 className='text-xl font-semibold mb-2'>{patient.name}</h3>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p className='mt-2 text-sm text-gray-700'>{patient.notes}</p>
        <div className='mt-4 text-right'>
          <button onClick={onClose} className='px-3 py-1 bg-gray-200 rounded'>Close</button>
        </div>
      </div>
    </div>
  )
}

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [localAdd, setLocalAdd] = useState({ name: '', age: '', contact: '', notes: '' });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList(search = '') {
    setLoading(true); setError('');
    try {
      const url = 'http://localhost:4000/api/patients' + (search ? ('?q=' + encodeURIComponent(search)) : '');
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      // console.log(data)
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    if (q.trim() === '') { fetchList(); return; }
    const filtered = patients.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
    setPatients(filtered);
  }

  function viewDetails(p) {
    setSelected(p);
  }

  function handleAdd(e) {
    e.preventDefault();
    const newP = {
      id: 'local-' + Date.now(),
      name: localAdd.name || 'Unnamed',
      age: Number(localAdd.age) || 0,
      contact: localAdd.contact || '',
      notes: localAdd.notes || ''
    };
    setPatients(prev => [newP, ...prev]);
    setLocalAdd({ name: '', age: '', contact: '', notes: '' });
  }

  return (
    <section>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4'>
        <h2 className='text-2xl font-semibold'>Patients</h2>

      </div>

      <div className='mb-6'>
        <form onSubmit={handleAdd} className='bg-white p-4 rounded shadow space-y-2'>
          <h3 className='font-semibold'>Add New Patient (local)</h3>
          <div className='flex flex-col sm:flex-row gap-2'>
            <input className='flex-1 px-2 py-1 border rounded' placeholder='Name' value={localAdd.name} onChange={(e) => setLocalAdd({ ...localAdd, name: e.target.value })} />
            <input className='w-24 px-2 py-1 border rounded' placeholder='Age' value={localAdd.age} onChange={(e) => setLocalAdd({ ...localAdd, age: e.target.value })} />
            <input className='w-40 px-2 py-1 border rounded' placeholder='Contact' value={localAdd.contact} onChange={(e) => setLocalAdd({ ...localAdd, contact: e.target.value })} />
          </div>
          <textarea className='w-full px-2 py-1 border rounded' placeholder='Notes' value={localAdd.notes} onChange={(e) => setLocalAdd({ ...localAdd, notes: e.target.value })} />
          <div className='text-right'>
            <button className='px-3 py-1 bg-green-600 text-white rounded' type='submit'>Add Patient</button>
          </div>
        </form>
      </div>

      {loading && <div className='py-6'>Loading...</div>}
      {error && <div className='text-red-500'>{error}</div>}

      <div className='flex gap-2 mb-4 justify-end'>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder='Search by name' className='px-3 py-2 rounded border' />
        <button onClick={handleSearch} className='px-3 py-2 bg-indigo-600 text-white rounded'>Search</button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {patients.map(p => <PatientCard key={p.id} p={p} onView={viewDetails} />)}
      </div>

      <Modal patient={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
