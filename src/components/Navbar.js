import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <header className='flex px-3 text-slate-900 bg-blue-300 justify-between items-center'>
        <h2>
          ANILIST Unofficial
        </h2>
        <nav >
          <ul className='flex items-center mx-3 gap-2'>
            <li className='hover:text-blue-500'>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className='hover:text-blue-500'>
              <NavLink to='/about'>About Us</NavLink>
            </li>
            <li className='hover:text-blue-500'>
              <NavLink to='/trending'>Trending</NavLink>
            </li>
            <li className='hover:text-blue-500'>
              <NavLink to='/popular'>Popular</NavLink>
            </li>
            <li className='hover:text-blue-500'>
              <NavLink to='/schedule'>Schedule</NavLink>
            </li>
            <li className='hover:text-blue-500'>
              <NavLink to='/filter'>Filter</NavLink>
            </li>
          </ul>
        </nav> 
      </header>
    </>
  );
}

export default Navigation;
