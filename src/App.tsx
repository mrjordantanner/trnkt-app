// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import './MediaQueries.scss';
import './Animations.scss';

import { AssetProvider } from './contexts/AssetContext';
import { NftServiceProvider } from './contexts/NftServiceContext';
import { UserServiceProvider } from './contexts/UserServiceContext';
import { FavoritesServiceProvider } from './contexts/FavoritesServiceContext';

import ExploreView from './components/ExploreView';
import CollectionView from './components/CollectionView';
import RandomGallery from './components/RandomGallery';
import AssetView from './components/asset/AssetView';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Toolbar from './components/Toolbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import FavoritesView from './components/favorites/FavoritesView';
import NormalizeUrl from './components/utils/NormalizeUrl';

export default function App() {
  //const location = useLocation();
  
  return (
    <>
      <AssetProvider>
      <NftServiceProvider>
      <UserServiceProvider>
      <FavoritesServiceProvider>
      <NormalizeUrl />

          <Routes>

            <Route path='/' element={<Home />} />

            {/* Routes for '/nfts' */}
            <Route path='/nfts' element={
              <>
                <Navbar />
                <Toolbar />
                <Outlet />
                <MobileNavbar />
              </>
            }>

              <Route index element={<CollectionView />} /> 
              <Route path='collections/featured' element={<CollectionView />} />
              <Route path='collections/:collectionSlug' element={<ExploreView />} />
              <Route path=':collectionSlug/:assetId' element={<AssetView />} />
              <Route path='random' element={<RandomGallery />} />
              <Route path='favorites' element={<FavoritesView />} />
            </Route>
            
            {/* Routes for '/user' */}
            <Route path='/user' element={
              <>
                {/* <Navbar />
                <Toolbar /> */}
                <Outlet />
                {/* <MobileNavbar /> */}
              </>
            }>
              <Route path='register' element={<Register/>} />
              <Route path='login' element={<Login />} />
              {/* <Route path='logout' element={<Logout />} /> */}
              <Route path='profile' element={<Profile />} />

            </Route>
          </Routes>
      </FavoritesServiceProvider>
      </UserServiceProvider>
      </NftServiceProvider>
      </AssetProvider>
    </>
  );
}