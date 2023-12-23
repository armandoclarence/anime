import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import Anime from './components/Anime';
import AnimeDetail from './pages/AnimeDetail';

function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
            <Route index element={
              <Home>
                <Anime fetchType='schedule' title='Scheduled Anime' query='p=1&limit=14'/>
                <Anime fetchType='popular' title='Popular Anime' query='p=1&limit=7'/>
                <Anime fetchType='trending' title='Trending Anime' query='p=1&limit=7'/>
              </Home>
              }
            />
            <Route path='about' element={<About/>}/>
            <Route path='anime/:id' element={<AnimeDetail/>}>
              <Route path=':ep'></Route>
            </Route>
          </Routes>
      </Router>
  );
}

export default App;
