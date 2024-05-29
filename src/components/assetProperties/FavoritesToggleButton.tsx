import React, { useState, useEffect } from 'react';
import { Nft } from '../../models/nft';

interface Props {
  addToFavorites: (asset: Nft) => void;
  removeFromFavorites: (asset: Nft) => void;
  asset: Nft | null;
  localFavorites: Nft[] | null;
}

export default function FavoritesToggleButton ({ 
  addToFavorites, removeFromFavorites, asset,localFavorites }: Props) {
    
  const [favoritesState, setFavoritesState] = useState<boolean>(false);

  useEffect(() => {
    if (localFavorites) {
        const includesAsset = localFavorites.some(a => a?.identifier === asset?.identifier);
        setFavoritesState(includesAsset);
      }
  }, [asset?.identifier, localFavorites]);

  const handleAddToFavorites = () => {
    if (asset) {   
        addToFavorites(asset);
        setFavoritesState(true);
      }
  };

  const handleRemoveFromFavorites = () => {
    if (asset) {  
      removeFromFavorites(asset);
      setFavoritesState(false);
    }
  };

  return (
    <div className="button-container">
      {favoritesState ? (
        <div onClick={handleRemoveFromFavorites} className="favorites-button remove">
          Remove from Favorites
        </div>
      ) : (
        <div onClick={handleAddToFavorites} className="favorites-button add">
          Add to Favorites
        </div>
      )}
    </div>
  );
}
