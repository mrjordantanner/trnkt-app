import React, { useEffect } from 'react';
import Card from './Card';
import diamond from '../images/diamond.svg';
import { Nft } from '../models/nft';

interface Props {
  chain: string;
  collection: Nft[];
  // removeFromCollection: (id: string) => void;
  // addToCollection: (id: string) => void;
  loadCollectionData: () => void;
}

export default function Collection({ chain, collection, loadCollectionData }: Props) {

  useEffect(() => {
    loadCollectionData();
  });

  return (
    <>
      <div className="collection-wrapper">
        <h1 className="header">C O L L E C T I O N</h1>
        <div className="gem-background-wrapper">
          <img className="gem-background" src={diamond} alt="diamond" />
        </div>
        <div className="container">
          {collection.length > 0 ? (
            collection.map((asset: Nft) => (
              <Card asset={asset} chain={chain} key={asset?.identifier} />
            ))
          ) : (
            <h2 className="empty">Collection is empty.</h2>
          )}
        </div>
      </div>
    </>
  );
}
