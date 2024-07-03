// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import { AssetProvider } from './contexts/AssetContext';
import { NftServiceProvider } from './contexts/NftServiceContext';
import { UserServiceProvider } from './contexts/UserServiceContext';
import { FavoritesServiceProvider } from './contexts/FavoritesServiceContext';

import CollectionView from './components/CollectionView';
import ExploreView from './components/ExploreView';
import RandomGallery from './components/RandomGallery';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

function App() {


  return (
    <>
      <AssetProvider>
      <NftServiceProvider>
      <UserServiceProvider>
      <FavoritesServiceProvider>
        <Navbar />
        <Toolbar />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<CollectionView />} />
            <Route path='/explore' element={<ExploreView />} />
            <Route path='/random' element={<RandomGallery />} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            {/* <Route path='/favorites' element={<Favorites />} /> */}

          </Routes>
      </FavoritesServiceProvider>
      </UserServiceProvider>
      </NftServiceProvider>
      </AssetProvider>
    </>
  );
}

export default App;
