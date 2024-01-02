import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import AnimeDetail from './pages/AnimeDetail';
import React from 'react';
import NotFound from './pages/NotFound';
import Trending from './pages/Trending';
import Footer from './components/Footer';
import Popular from './pages/Popular';
import Schedule from './pages/Schedule';
import AnimeFilter from './pages/AnimeFilter';
const LazyAnime = React.lazy(()=> import('./components/Anime'))

function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
            <Route index element={
              <Home>
                <React.Suspense fallback='Loading ...'>
                  <LazyAnime fetchType='schedule' title='Scheduled Anime' query='limit=14'/>
                  <LazyAnime fetchType='popular' title='Popular Anime' query='limit=7'/>
                  <LazyAnime fetchType='trending' title='Trending Anime' query='limit=7'/>
                </React.Suspense>
              </Home>
              }
            />
            <Route path='about' element={<About/>}/>
            <Route path='anime/:id' element={<AnimeDetail/>}>
              <Route path=':ep' element={<AnimeDetail/>} />
            </Route>
            <Route path='trending' element={
              <Trending>
                <React.Suspense fallback='Loading ...'>
                  <LazyAnime fetchType='trending' title='Trending Anime' query='limit=28'/>
                </React.Suspense>
              </Trending>
            } />
            <Route path='popular' element={
              <Popular>
                <React.Suspense fallback='Loading ...'>
                  <LazyAnime fetchType='popular' title='Popular Anime' query='limit=28'/>
                </React.Suspense>
              </Popular>
            } />
            <Route path='schedule' element={
              <Schedule>
                <React.Suspense fallback='Loading ...'>
                  <LazyAnime fetchType='schedule' title='Schedule Anime' query='limit=28'/>
                </React.Suspense>
              </Schedule>
            } />
            <Route path='filter' element={<AnimeFilter/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;
