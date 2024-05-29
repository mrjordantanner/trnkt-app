import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import NavbarAsset from './components/NavbarAsset';
// import NavbarGallery from './components/NavbarGallery';
// import NavbarFavorites from './components/NavbarFavorites';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import AssetView from './components/AssetView';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NftService from './services/service';
import Loading from './components/Loading';
import { Nft } from './models/nft';
// import dotenv from 'dotenv';

//dotenv.config();

export const service = new NftService();
const collectionSlug = 'parallel-on-base';  // new-dimension-huemin  parallel-on-base  clonex
const chain = 'base'; // ethereum  base

function App() {

  // Array of NFT data that is currently in memory
  const [data, setData] = useState<Nft[] | null>(null);

  // NFTs that user has saved as a Favorite
  const [favorites, setFavorites] = useState<Nft[] | null>([]);

  // Which collection are we currently browsing, if any?
  const [collection, setCollection] = useState<string>('');

  useEffect(() => {
    fetchData();
    loadFavoritesData();
  }, []);

  const fetchData = async () => {
    console.log("Fetching data...");
    setData(null);  // Clear local data cache
  
    try {
      const nfts: Nft[] | null = await service.fetchNfts(collectionSlug);
      console.log(nfts);
      setData(nfts);

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  // const clearLocalFavorites = () => {
  //   setFavorites([]);
  //   console.log("Local Favorites Cleared."); 
  // };

  const randomizeOffset = () => {
    console.log("TODO: Randomize Offset");
  }

  const writeFavoritesData = (favoritesData: Nft[] | null) => {
    localStorage.setItem('favorites', JSON.stringify({ collection: favoritesData }));
  };

  const loadFavoritesData = () => {
    const collectionString = localStorage.getItem('favorites');
    if (!collectionString) {
      return;
    }
    const collectionObj = JSON.parse(collectionString);
    if (!collectionObj) {
      return;
    }
    setFavorites(collectionObj.collection);
  };

  const addToFavorites = (asset: Nft | null) => {

    // If Nft[] is null, set it to be an empty array.  Otherwise, spread the collection and add the new item.
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
    if (!asset || !collection) {
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
  
  if (!data) {
    return <Loading />;
  }

  return (
    <>
    <Navbar randomizeOffset={randomizeOffset} />

    {/* <Router> */}
      <Routes>

    {/* CONTENT */}
        <Route path='/' element={<Home />} />

        <Route path='/explore' element={ 
          <Gallery data={data} chain={chain} setCollection={setCollection}/>} />

        <Route path='/favorites' element={
                <Favorites chain={chain} favorites={favorites} loadFavoritesData={loadFavoritesData} />} />

        <Route
          path='/chain/:chain/contract/:address/nfts/:id'
          element={<AssetView
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            localFavorites={favorites}
          />}
        />

     {/* NAVBAR */}
        {/* <Route path="/explore" element={<NavbarGallery          
          randomizeOffset={randomizeOffset} 
          clearFavorites={clearFavorites}/>} />
        <Route path="/collection" element={<NavbarFavorites 
          randomizeOffset={randomizeOffset} 
          clearFavorites={clearFavorites} />} />
        <Route path="/asset" element={<NavbarAsset />} /> */}

      </Routes>
    {/* </Router> */}
    </>
  );
}

export default App;
