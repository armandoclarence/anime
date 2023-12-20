import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <nav className='bg-blue-300'>
        <ul className='flex items-center mx-3  gap-2'>
          <li className='hover:text-blue-500'>
            <Link to="/">Home</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
