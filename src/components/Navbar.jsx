import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-transparent text-zinc-950 py-2 w-full'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>TODO</span>
        </div>
        <ul className="flex justify-end gap-8 mx-9 w-1/2">
          <li className='cursor-pointer hover:font-bold transition-all -10'>Home</li>
          <li className='cursor-pointer hover:font-bold transition-all w-20'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
