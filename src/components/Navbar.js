import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <nav className='bg-blue-300'>
        <ul className='flex items-center mx-3 gap-2'>
          <li className='hover:text-blue-500'>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className='hover:text-blue-500'>
            <NavLink to='/about'>About Us</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
