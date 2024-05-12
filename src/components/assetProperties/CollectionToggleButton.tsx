import React, { useState, useEffect } from 'react';
import { Asset } from '../../models/asset';

interface Props {
  addToCollection: (asset: Asset) => void;
  removeFromCollection: (asset: Asset) => void;
  asset: Asset;
  localCollection: Asset[];
}

export default function CollectionToggleButton ({ 
  addToCollection, removeFromCollection, asset, localCollection }: Props) {
    
  const [collectionState, setCollectionState] = useState<boolean>(false);

  useEffect(() => {
    const includesAsset = localCollection.some(a => a?.id === asset?.id);
    setCollectionState(includesAsset);
  }, [asset?.id, localCollection]);

  const handleAddToCollection = () => {
    addToCollection(asset);
    setCollectionState(true);
  };

  const handleRemoveFromCollection = () => {
    removeFromCollection(asset);
    setCollectionState(false);
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
