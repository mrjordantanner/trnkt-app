import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
    randomizeOffset: () => void;
    clearCollection: () => void;
  }

  // TODO The Navbar should be one Component that conditionally renders its elements
export default function NavbarGallery({ randomizeOffset, clearCollection }: Props) {

    return (
        <div className='navbar-container'>
            <div className='navbar-blur'></div>
                <ul>
                   <li><Link className='nav-link' to='/'>TRNKT</Link></li>
                   <li><Link className='button outline-secondary' to='/explore' onClick={randomizeOffset}>E X P L O R E</Link></li>
                   <li><Link className='button outline-primary' to='/collection' onClick={clearCollection} >C O L L E C T I O N</Link></li>
                </ul>
        </div>
    )
}
