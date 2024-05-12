import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarAsset from './components/NavbarAsset';
import NavbarGallery from './components/NavbarGallery';
import NavbarCollection from './components/NavbarCollection';
import Gallery from './components/Gallery';
import Collection from './components/Collection';
import AssetView from './components/AssetView';
import Navbar from './components/Navbar';
//import ErrorPage from './components/ErrorPage';
//import NftService from './services/nftService';
import Home from './components/Home';
// import Loading from './components/Loading';
import { Asset } from './models/asset';
// import dotenv from 'dotenv';

//dotenv.config();
//const service = new nftService();

function App() {
  const [data, setData] = useState<Asset[] | null>(null);
  const [collection, setCollection] = useState<Asset[]>([]);

  useEffect(() => {
    fetchData();
    loadCollectionData();
  }, []);

  const fetchData = () => {
    setData(null);  // Clear local data cache

    //service.getAssets()   // Fetch NFT data from Opensea API
      // .then(setData)
     // .catch((error: Error) => console.error(`Error: ${error}`));
  };

  const clearLocalCollection = () => {
    setCollection([]);
    console.log("Local Collection Cleared.");
  };

  const randomizeOffset = () => {
    console.log("TODO: Randomize Offset");
  }

  const writeCollectionData = (collectionData: Asset[]) => {
    localStorage.setItem('collection', JSON.stringify({ collection: collectionData }));
  };

  const loadCollectionData = () => {
    const collectionString = localStorage.getItem('collection');
    if (!collectionString) {
      return;
    }
    const collectionObj = JSON.parse(collectionString);
    if (!collectionObj) {
      return;
    }
    setCollection(collectionObj.collection);
  };

  const addToCollection = (asset: Asset) => {
    const updatedCollection = [...collection, asset];
    setCollection(updatedCollection);
    writeCollectionData(updatedCollection);
    console.log(`added: ${asset?.id}`);
  };

  const clearCollection = () => {
    const confirmation = window.confirm('Really delete your entire Collection?');
    if (confirmation) {
      clearLocalCollection();
      localStorage.clear();
    }
  };

  const removeFromCollection = (asset: Asset) => {
    const updatedCollection = collection.filter(item => item?.id !== asset?.id);
    setCollection(updatedCollection);
    writeCollectionData(updatedCollection);
    console.log(`removed: ${asset?.id}`);
  };

  // if (!data) {
  //   return <Loading />;
  // }

  return (
    <>
    <Navbar randomizeOffset={randomizeOffset} clearCollection={clearCollection}/>

    <Router>
      <Routes>

    {/* CONTENT */}
        <Route path='/' element={<Home />} />

        <Route path='/explore' element={ 
          <Gallery data={data} />} />

        <Route path='/collection' element={
                <Collection collection={collection} loadCollectionData={loadCollectionData} />} />

        <Route
          path='/asset/:contract/:token'
          element={<AssetView
            addToCollection={addToCollection}
            removeFromCollection={removeFromCollection}
            localCollection={collection}
          />}
        />

     {/* NAVBAR */}
        <Route path="/explore" element={<NavbarGallery          
          randomizeOffset={randomizeOffset} 
          clearCollection={clearCollection}/>} />
        <Route path="/collection" element={<NavbarCollection 
          randomizeOffset={randomizeOffset} 
          clearCollection={clearCollection} />} />
        <Route path="/asset" element={<NavbarAsset />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
