import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MoodPage from './pages/MoodPage/MoodPage'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/About/AboutPage'

function App() {
  const [moodList, setMoodList] = useState(null);

  useEffect(() => {
    axios
      .get("https://json-moodify.adaptable.app/playlists")
      .then(({ data }) => setMoodList(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage moodList={moodList} />} />
            <Route path="/:moodId" element={<MoodPage  moodList={moodList}/>} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
