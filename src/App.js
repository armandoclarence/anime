import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Navigation from './components/Navigation';
import Anime from './components/Anime';
import AnimeDetail from './components/AnimeDetail';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Navigation/>}>
              <Route index element={
                <Home>
                  <Anime />
                  <AnimeDetail />
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
