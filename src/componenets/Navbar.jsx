import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-slate-400 py-4'>
            <div className="logo">
                <span className='font-bold text-3xl '>Task-Co</span>
            </div>
            <ul className="flex gap-8 ">
                <li className='hover:cursor-pointer hover:font-bold transition-all '>home</li>
                <li className='hover:cursor-pointer hover:font-bold transition-all'>Your task</li>
            </ul>
        </nav>
    )
}

export default Navbar
