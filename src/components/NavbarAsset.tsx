import React from 'react';
import { Link } from 'react-router-dom';

// TODO The Navbar should be one Component that conditionally renders its elements
export default function NavbarAsset() {
  return (
    <div className='navbar-container'>
      <div className='navbar-blur'></div>
      <ul>
        <li><Link className='nav-link' to='/'>TRNKT</Link></li>
        <li><Link className='button outline-secondary' to='/explore' >E X P L O R E</Link></li>
        <li><Link className='button outline-primary' to='/collection' >C O L L E C T I O N</Link></li>
      </ul>
    </div>
  );
}
