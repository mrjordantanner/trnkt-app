import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  randomizeOffset: () => void;
  clearCollection: () => void;
}

// TODO The Navbar should be one Component that conditionally renders its elements
export default function NavbarCollection({ randomizeOffset, clearCollection }: Props) {
  return (
    <div className="navbar-container">
      <div className="navbar-blur"></div>
      <ul>
        <li>
          <Link className="nav-link" to="/">
            TRNKT
          </Link>
        </li>
        <li>
          <Link className="button outline-secondary" to="/explore" onClick={randomizeOffset}>
            E X P L O R E
          </Link>
        </li>
        <li>
          <button className="button outline-tertiary clear-collection" onClick={clearCollection} >
            Clear Collection
          </button>
        </li>
      </ul>
    </div>
  );
}
