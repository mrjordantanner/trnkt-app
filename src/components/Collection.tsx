import React, { useEffect } from 'react';
import Card from './AssetCard';
//import diamond from '../images/diamond.svg';
import { Nft } from '../models/nft';
import { Box } from '@mui/material';

interface Props {
  chain: string;
  collection: Nft[] | null;
  loadCollectionData: () => void;
}

export default function Collection({ chain, collection, loadCollectionData }: Props) {

  useEffect(() => {
    loadCollectionData();
  }, [loadCollectionData]); // Do we need loadCollectionData as a dependency?  What does having a method in the dep array mean?

  if (!collection || collection.length == 0) {
    return <h2 className="empty">Collection is empty.</h2>
  }

  return (
    <Box className="collection-wrapper">
      <h1 className="header">C O L L E C T I O N</h1>
      {/* <div className="gem-background-wrapper">
        <img className="gem-background" src={diamond} alt="diamond" />
      </div> */}
      <Box className="container">
        {
          collection.map((asset: Nft) => (
            <Card asset={asset} chain={chain} key={asset?.identifier} />
          ))
        }
      </Box>
    </Box>
  );
}
