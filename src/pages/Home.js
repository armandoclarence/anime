import React from 'react'

function Home({children}) {
  return (
    <div className="bg-stone-800 p-2">
      {children}  
    </div>
  )
}

export default Home