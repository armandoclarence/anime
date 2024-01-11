import { LiaCopyright } from 'react-icons/lia'
function Footer() {
  return (
    <footer className='text-zinc-300 bottom-0 z-20 py-4 pl-3 mt-4 bg-stone-800'>
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