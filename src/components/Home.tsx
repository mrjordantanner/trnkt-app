import React from 'react';
import { Link } from 'react-router-dom';
import diamond from '../images/diamond.svg';

export default function Home () {
  return (
    <div>
      <div className="home-container">
        <img className="gem-background-float invert" src={diamond} alt="diamond" />
        <div className="logo text-outline">TRNKT</div>
        <p className="description">
          Discover a wide variety of crypto{' '}
          <a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noopener noreferrer">
            <strong>Nft</strong>
          </a>{' '}
          artwork. Use the Explore button to display random Nft's from the Opensea API, click or tap to view them in
          detail, and save to your Collection for later viewing. <br></br>
        </p>
        <Link to="/explore">
          <div className="button outline-secondary enter">
            E X P L O R E
          </div>
        </Link>
        <footer className="fixed-footer">
          <p>
            Powered by{' '}
            <a href="https://opensea.io/" target="_blank" rel="noopener noreferrer">
              <strong>Opensea.io</strong>
            </a>
          </p>
          <p>
            Built by {' '}
            <a href="https://jordansmithdigital.com" target="_blank" rel="noopener noreferrer">
              <strong>Jordan Smith Digital</strong>
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
