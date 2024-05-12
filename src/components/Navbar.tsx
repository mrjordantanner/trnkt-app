import React from 'react'
//import { Link } from 'react-router-dom';

interface Props {
    randomizeOffset: () => void;
    clearCollection: () => void;
  }

  // MASTER NAVBAR COMPONENT
  // TODO conditionally render buttons, etc
  // TODO change a/href back to Link
export default function Navbar({ randomizeOffset, clearCollection }: Props) {

    return (
        <div className='navbar-container'>
            <div className='navbar-blur'></div>
                <ul>
                   <li><a className='nav-link' href='/'>TRNKT</a></li>
                   <li><a className='button outline-secondary' href='/explore' onClick={randomizeOffset}>E X P L O R E</a></li>
                   <li><a className='button outline-primary' href='/collection' onClick={clearCollection} >C O L L E C T I O N</a></li>
                </ul>
        </div>
    )
}
