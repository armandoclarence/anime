import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import AnimeDetail from './pages/AnimeDetail';
import React from 'react';
import NotFound from './pages/NotFound';
const LazyAnime = React.lazy(()=> import('./components/Anime'))

function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
            <Route index element={
              <Home>
                <React.Suspense fallback='Loading ...'>
                  <LazyAnime fetchType='schedule' title='Scheduled Anime' query='p=1&limit=14'/>
                  <LazyAnime fetchType='popular' title='Popular Anime' query='p=1&limit=7'/>
                  <LazyAnime fetchType='trending' title='Trending Anime' query='p=1&limit=7'/>
                </React.Suspense>
              </Home>
              }
            />
            <Route path='about' element={<About/>}/>
            <Route path='anime/:id' element={<AnimeDetail/>}>
              <Route path=':ep' element={<AnimeDetail/>} />
            </Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>
      </Router>
  );
}

export default App;
