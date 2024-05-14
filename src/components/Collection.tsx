import React, { useEffect } from 'react';
import Card from './Card';
import diamond from '../images/diamond.svg';
import { Asset } from '../models/nft';

interface Props {
  collection: Asset[];
  // removeFromCollection: (id: string) => void;
  // addToCollection: (id: string) => void;
  loadCollectionData: () => void;
}

export default function Collection({ collection, loadCollectionData }: Props) {

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
            collection.map((asset: Asset) => (
              <Card asset={asset} key={asset?.id} />
            ))
          ) : (
            <h2 className="empty">Collection is empty.</h2>
          )}
        </div>
      </div>
    </>
  );
}
