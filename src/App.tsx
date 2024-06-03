import './App.scss';
import React, { useState, useEffect } from 'react';
import { AssetProvider } from './contexts/AssetContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ExploreView from './components/ExploreView';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NftService from './services/service';
import { Nft } from './models/nft';
//import Loading from './components/Loading';

export const service = new NftService();
const defaultCollection = 'parallel-on-base';
//const chain = 'base'; // ethereum / base

function App() {

  // Array of NFT data that is currently cached in memory
  const [data, setData] = useState<Nft[] | null>(null);

  // NFTs that user has saved as a Favorite
  // TODO convert this to context / Read FavoritesLists from User data
  const [favorites, setFavorites] = useState<Nft[] | null>([]);

  // Which collection are we currently browsing, if any?
  // TODO convert this to context
  const [selectedCollection, setCollection] = useState<string>(defaultCollection);

  useEffect(() => {
    async function getNftBatch(): Promise<Nft[] | null> {
      const assets = await service.fetchNfts(selectedCollection);
      console.log(assets);
      setData(assets);
      return assets;
    }

    getNftBatch();
    loadFavoritesData();
  }, [selectedCollection]);

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
    if (!asset || !selectedCollection) {
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
        <Navbar  />

        {/* <Router> */}
          <Routes>

        {/* CONTENT */}
            <Route path='/' element={<Home />} />

            <Route path='/explore' element={ 
              <ExploreView 
                data={data}
                selectedCollection={selectedCollection} 
                setCollection={setCollection}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                localFavorites={favorites}
              />} />

            <Route path='/favorites' element={
              <Favorites favorites={favorites}
              loadFavoritesData={loadFavoritesData} 
              />} />

            {/* <Route
              path='/chain/:chain/contract/:address/nfts/:id'
              element={<AssetView
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                localFavorites={favorites}
              />}
            /> */}

          </Routes>
        {/* </Router> */}
      </AssetProvider>
    </>
  );
}

export default App;
