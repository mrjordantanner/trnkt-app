import React from 'react';
import { Asset } from '../../models/asset';

interface Props {
  asset: Asset;
}

export default function AssetImage ({ asset }: Props) {
  return (
    <div className='asset-view-image'>
      {asset?.imgUrl ? (
        <img src={asset.imgUrl} alt={asset.name} />
      ) : (
        <h3>NO IMAGE AVAILABLE</h3>
      )}
    </div>
  );
}
