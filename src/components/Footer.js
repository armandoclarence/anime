import React from 'react'
import { LiaCopyright } from 'react-icons/lia'
function Footer() {
  return (
    <footer className='text-zinc-300 py-4 bg-slate-600'>
      <div className="flex flex-col">
        <h2>
          ANILIST Unofficial
        </h2>
        <p className='flex items-center'>copyright <LiaCopyright/> ANILIST Unofficial</p>
      </div>
    </footer>
  )
}

export default Footer