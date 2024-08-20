import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MoodPage from './pages/MoodPage/MoodPage'
import AddPlaylistPage from './pages/AddPlaylist/AddPlaylistPage'
import AboutPage from './pages/About/AboutPage'
import Footer from './components/Footer/Footer'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  const [playlistList, setPlaylistList] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(null);

  const clientId = 'dfdce7edcb2644cd985ecca96b5252e5';
  const clientSecret = '5c7cdba168b24c198ab03779eb8e0f55';

  const getPlaylists = () => {
    axios
      .get("https://json-moodify.adaptable.app/playlists")
      .then(({ data }) => setPlaylistList(data))
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

  const createPlaylist = playlistDetails => {
    const newPlaylist = { ...playlistDetails, id: Math.max(...playlistList.map(playlist => playlist.id)) + 1, }
    setPlaylistList([...playlistList, newPlaylist])
  }

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage playlistList={playlistList} />} />
            <Route path="/:moodId" element={<MoodPage playlistList={playlistList} token={spotifyToken} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element={<AddPlaylistPage callbackToCreate={createPlaylist} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
