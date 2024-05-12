import React from 'react';

interface Props {
  name: string | undefined;
}

export default function AssetName ({ name }: Props ) {
  
  if (!name || name === '') {
    return <h1 className='name'>Untitled</h1>;
  } else {
    return <h1 className='name'>{name}</h1>;
  }
}
