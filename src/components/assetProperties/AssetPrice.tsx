import React from 'react';

interface Props {
  price : number | undefined;
}

export default function AssetPrice ({ price }: Props ) {
  
  if (!price || price === undefined) {
    return (
      <li className='flex-row'>
        <h3>Price: Unsold</h3>
      </li>
    );
  }

  return (
    <li className='flex-row'>
      <h3>Last Trade Price</h3>
      <p className='price'>{price}</p>
    </li>
  );
}
