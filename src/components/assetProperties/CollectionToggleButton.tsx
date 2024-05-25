import React, { useState, useEffect } from 'react';
import { Nft } from '../../models/nft';

interface Props {
  addToCollection: (asset: Nft) => void;
  removeFromCollection: (asset: Nft) => void;
  asset: Nft | null;
  localCollection: Nft[] | null;
}

export default function CollectionToggleButton ({ 
  addToCollection, removeFromCollection, asset,localCollection }: Props) {
    
  const [collectionState, setCollectionState] = useState<boolean>(false);

  useEffect(() => {
    if (localCollection) {
        const includesAsset = localCollection.some(a => a?.identifier === asset?.identifier);
        setCollectionState(includesAsset);
      }
  }, [asset?.identifier, localCollection]);

  const handleAddToCollection = () => {
    if (asset) {   
        addToCollection(asset);
        setCollectionState(true);
      }
  };

  const handleRemoveFromCollection = () => {
    if (asset) {  
      removeFromCollection(asset);
      setCollectionState(false);
    }
  };

  return (
    <div className="button-container">
      {collectionState ? (
        <div onClick={handleRemoveFromCollection} className="collection-button remove">
          Remove from Collection
        </div>
      ) : (
        <div onClick={handleAddToCollection} className="collection-button add">
          Add to Collection
        </div>
      )}
    </div>
  );
}
