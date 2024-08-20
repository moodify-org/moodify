import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MoodPage from './pages/MoodPage/MoodPage'
import Footer from './components/Footer/Footer'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Route, Routes } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/About/AboutPage'
import AddPlaylistPage from './pages/AddPlaylist/AddPlaylistPage'

function App() {
  const [moodList, setMoodList] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);

  const clientId = '2bd460b04c6f4b8db226b69cf8ab0b96'; 
  const clientSecret = '85d7b542e98a4533ab1fac32b7c1d91d'; 

  const getPlaylists = () => {
    axios
      .get("https://json-moodify.adaptable.app/playlists")
      .then(({ data }) => setMoodList(data))
      .catch(e => console.log(e));
  }

  const getSpotifyToken = () => {
    axios.post('https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
      .then(response => {
        setSpotifyToken(response.data.access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getPlaylists();
    getSpotifyToken();
  }, []);

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage moodList={moodList} />} />
            <Route path="/:moodId" element={<MoodPage moodList={moodList} token={spotifyToken}/>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element ={<AddPlaylistPage callbackToCreate={createPlaylist}/>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
