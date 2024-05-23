import React, { useRef } from 'react';
import Card from './Card';
import diamond from '../images/diamond.svg';
import Loading from './Loading';
import { Nft } from '../models/nft';

interface Props {
  data: Nft[] | null;
  chain: string;
}

export default function Gallery({ data, chain }: Props) {
  const gallery = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (gallery.current) {
      gallery.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="gallery-wrapper" ref={gallery}>
      <div id="top"></div>

      <div className="gem-background-wrapper">
        <img className="gem-background invert" src={diamond} alt="diamond" />
      </div>

      <div className="gallery-window">
        <div className="gallery-container">
          {data.map((asset: Nft) => (
            <Card asset={asset} chain={chain} key={asset.identifier} />
          ))}
        </div>
        <footer className="footer">
          <button className="button outline-secondary" onClick={scrollToTop}>
            Back to Top
          </button>
        </footer>
      </div>
    </div>
  );
}
