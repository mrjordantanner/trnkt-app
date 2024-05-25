import './App.scss';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import NavbarAsset from './components/NavbarAsset';
// import NavbarGallery from './components/NavbarGallery';
// import NavbarCollection from './components/NavbarCollection';
import Gallery from './components/Gallery';
import Collection from './components/Collection';
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

  const [data, setData] = useState<Nft[] | null>(null);
  const [collection, setCollection] = useState<Nft[] | null>([]);

  useEffect(() => {
    fetchData();
    loadCollectionData();
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

  const clearLocalCollection = () => {
    setCollection([]);
    console.log("Local Collection Cleared."); 
  };

  const randomizeOffset = () => {
    console.log("TODO: Randomize Offset");
  }

  const writeCollectionData = (collectionData: Nft[] | null) => {
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

  const addToCollection = (asset: Nft | null) => {

    // If Nft[] is null, set it to be an empty array.  Otherwise, spread the collection and add the new item.
    const updatedCollection: Nft[] = [...(collection || []), asset].filter((item): item is Nft => item !== null);

    setCollection(updatedCollection);
    writeCollectionData(updatedCollection);
  
    console.log(`added: ${asset?.identifier}`);
  };
  
  const clearCollection = () => {
    const confirmation = window.confirm('Really delete your entire Collection?');
    if (confirmation) {
      clearLocalCollection();
      localStorage.clear();
    }
  };

  const removeFromCollection = (asset: Nft | null) => {
    if (!asset || !collection) {
      console.log('Asset is null or collection is empty.');
      return;
    }
  
    const assetExistsInCollection = collection.some(item => item.identifier === asset.identifier);
    
    if (!assetExistsInCollection) {
      console.log('Asset is not in the collection.');
      return;
    }
  
    const updatedCollection: Nft[] = collection.filter(item => item.identifier !== asset.identifier);
    setCollection(updatedCollection);
    writeCollectionData(updatedCollection);
  
    console.log(`removed: ${asset.identifier}`);
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
          <Gallery data={data} chain={chain} />} />

        <Route path='/collection' element={
                <Collection chain={chain} collection={collection} loadCollectionData={loadCollectionData} />} />

        <Route
          path='/chain/:chain/contract/:address/nfts/:id'
          element={<AssetView
            addToCollection={addToCollection}
            removeFromCollection={removeFromCollection}
            localCollection={collection}
          />}
        />

     {/* NAVBAR */}
        {/* <Route path="/explore" element={<NavbarGallery          
          randomizeOffset={randomizeOffset} 
          clearCollection={clearCollection}/>} />
        <Route path="/collection" element={<NavbarCollection 
          randomizeOffset={randomizeOffset} 
          clearCollection={clearCollection} />} />
        <Route path="/asset" element={<NavbarAsset />} /> */}

      </Routes>
    {/* </Router> */}
    </>
  );
}

export default App;
