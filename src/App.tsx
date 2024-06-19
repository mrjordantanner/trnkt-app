// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import { AssetProvider } from './contexts/AssetContext';
import { NftServiceProvider } from './contexts/NftServiceContext';
import { UserServiceProvider } from './contexts/UserServiceContext';

import CollectionView from './components/CollectionView';
import ExploreView from './components/ExploreView';
import RandomGallery from './components/RandomGallery';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {


  return (
    <>
      <AssetProvider>
      <NftServiceProvider>
      <UserServiceProvider>
        <Navbar />
        <Toolbar />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/collections' element={<CollectionView />} />
            <Route path='/explore' element={<ExploreView />} />
            <Route path='/random' element={<RandomGallery />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/profile' element={<Profile />} />
            {/* <Route path='/favorites' element={<Favorites />} /> */}

          </Routes>
      </UserServiceProvider>
      </NftServiceProvider>
      </AssetProvider>
    </>
  );
}

export default App;
