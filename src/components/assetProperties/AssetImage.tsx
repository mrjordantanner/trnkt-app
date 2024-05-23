import React from 'react';
import { Nft } from '../../models/nft';

interface Props {
  asset: Nft | null;
}

export default function AssetImage ({ asset }: Props) {
  return (
    <div className='asset-view-image'>
      {asset?.image_url ? (
        <img src={asset.image_url} alt={asset.name} />
      ) : (
        <h3>NO IMAGE AVAILABLE</h3>
      )}
    </div>
  );
}
