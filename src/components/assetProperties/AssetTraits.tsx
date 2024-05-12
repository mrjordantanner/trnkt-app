import React from 'react';
import { Asset, AssetTrait } from '../../models/asset'

interface Props {
  asset: Asset;
}

export default function AssetTraits ({ asset }: Props) {
  if (!asset?.traits) {
    return <li><h3>No embedded traits.</h3></li>;
  }

  return (
    <>
      <div className='flex-row'><h3>Traits</h3></div>
      <ul className='traits-list'>
        {asset.traits.map((trait: AssetTrait, index: number) => {
          return trait ? (
            <li key={`${trait.type}-${asset.id}-${index}`}>{trait.type}: {trait.value}</li>
          ) : null;
        })}
      </ul>
    </>
  );
}
