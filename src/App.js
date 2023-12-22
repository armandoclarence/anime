import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './components/Navigation';
import Anime from './components/Anime';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Navigation/>}>
              <Route index element={
                <Home>
                  <Anime fetchType='schedule' title='Scheduled Anime' query='p=1&limit=14'/>
                  <Anime fetchType='popular' title='Popular Anime' query='p=1&limit=7'/>
                  <Anime fetchType='trending' title='Trending Anime' query='p=1&limit=7'/>
                </Home>
                }
              />
              <Route path='about' element={<About/>}/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
