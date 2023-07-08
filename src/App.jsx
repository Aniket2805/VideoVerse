import React from 'react';
import { BrowserRouter ,Routes , Route} from 'react-router-dom';
import './index.css'
import { AppContext } from './context/contextAPI'
import Feed from './components/Feed';
import Header from './components/Header';
import SearchResult from './components/SearchResult';
import VideoDetails from './components/VideoDetails';

function App() {

  return (
      <AppContext>
        <BrowserRouter>
          <div className="flex flex-col h-full">
            <Header></Header>
            <Routes>
              <Route path="/" element={<Feed></Feed>}></Route>
              <Route path="/searchResult/:searchQuery" element={<SearchResult></SearchResult>}></Route>
              <Route path="/video/:id" element={<VideoDetails></VideoDetails>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AppContext>
  )
}

export default App
