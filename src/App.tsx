// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import React, { useState } from 'react';
import { Nft } from './models/nft';
import { AssetProvider } from './contexts/AssetContext';
import ExploreView from './components/ExploreView';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  // TODO convert this to context / Read FavoritesLists from User data
  const [favorites, setFavorites] = useState<Nft[] | null>([]);

  // const clearLocalFavorites = () => {
  //   setFavorites([]);
  //   console.log("Local Favorites Cleared."); 
  // };

  // TODO Create favorites modal window where users can create, edit, rename, and delete FavoritesLists
  const writeFavoritesData = (favoritesData: Nft[] | null) => {
    localStorage.setItem('favorites', JSON.stringify({ favorites: favoritesData }));
  };

  const loadFavoritesData = () => {
    const jsonString = localStorage.getItem('favorites');
    if (!jsonString) {
      return;
    }
    const obj = JSON.parse(jsonString);
    if (!obj) {
      return;
    }
    setFavorites(obj.favorites);
  };

  const addToFavorites = (asset: Nft | null) => {
    const updatedFavorites: Nft[] = [...(favorites || []), asset].filter((item): item is Nft => item !== null);
    setFavorites(updatedFavorites);
    writeFavoritesData(updatedFavorites);
    console.log(`Added to Favorites: ${asset?.collection} ${asset?.identifier}`);
  };
  
  // const clearFavorites = () => {
  //   const confirmation = window.confirm('Really clear your Favorites?');
  //   if (confirmation) {
  //     clearLocalFavorites();
  //     localStorage.clear();
  //   }
  // };

  const removeFromFavorites = (asset: Nft | null) => {
    if (!asset 
      //|| !selectedCollection
    ) {
      console.log('Asset is null or Favorites is empty.');
      return;
    }
    const assetExistsInFavorites = favorites && favorites.some((item : Nft) => item.identifier === asset.identifier);
    if (!assetExistsInFavorites) {
      console.log('Asset is not in Favorites.');
      return;
    }
    const updatedFavorites: Nft[] = favorites.filter((item : Nft) => item.identifier !== asset.identifier);
    setFavorites(updatedFavorites);
    writeFavoritesData(updatedFavorites);
    console.log(`Removed from Favorites: ${asset?.collection} ${asset?.identifier}`);
  };

  return (
    <>
      <AssetProvider>
        <Navbar numberFavorites={favorites?.length}  />

          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/explore' element={ 
              <ExploreView 
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                localFavorites={favorites}
              />} />

            <Route path='/favorites' element={
              <Favorites favorites={favorites}
              loadFavoritesData={loadFavoritesData} 
              />} />

          </Routes>
      </AssetProvider>
    </>
  );
}

export default App;
