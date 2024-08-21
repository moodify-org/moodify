import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MoodPage from './pages/MoodPage/MoodPage'
import AddPlaylistPage from './pages/AddPlaylist/AddPlaylistPage'
import PlaylistPage from './pages/PlaylistPage/PlaylistPage'
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

  const addPlaylist = newPlaylist => {
    setPlaylistList(prevList => [...prevList, newPlaylist]);
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

  const addTrackToPlaylist = (playlistId, track) => {
    const playlistToUpdate = playlistList.find(playlist => playlist.id === playlistId);

    if (playlistToUpdate) {
      const updatedPlaylist = {
        ...playlistToUpdate,
        songs: [...playlistToUpdate.songs, track]
      };

      axios.put(`https://json-moodify.adaptable.app/playlists/${playlistId}`, updatedPlaylist)
        .then(() => {
          setPlaylistList(prevPlaylists =>
            prevPlaylists.map(playlist =>
              playlist.id === playlistId ? updatedPlaylist : playlist
            )
          );
        })
        .catch(e => console.log(e));
    }
  };

  const deletePlaylist = (playlistId) => {
    axios.delete(`https://json-moodify.adaptable.app/playlists/${playlistId}`)
      .then(() => {
        setPlaylistList(prevPlaylists =>
          prevPlaylists.filter(playlist => playlist.id !== playlistId)
        );
      })
      .catch(e => console.log(e));
  };

  const handleDeleteSongs = (playlistId, trackId) => {
    const playlistToUpdate = playlistList.find(playlist => playlist.id === playlistId);

    if (playlistToUpdate) {
      const updatedSongs = playlistToUpdate.songs.filter(song => song.id !== trackId);
      const updatedPlaylist = {
        ...playlistToUpdate,
        songs: updatedSongs
      };

      axios.put(`https://json-moodify.adaptable.app/playlists/${playlistId}`, updatedPlaylist)
        .then(() => {
          setPlaylistList(prevPlaylists =>
            prevPlaylists.map(playlist =>
              playlist.id === playlistId ? updatedPlaylist : playlist
            )
          );
        })
        .catch(e => console.log(e));
    }
  };


  const gradients = [
    "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
  ];

  return (
    <>
      <div className="App">
        <NavBar />

        <div className="Routes">
          <Routes>
            <Route path="/" element={<HomePage playlistList={playlistList} gradients={gradients} />} />
            <Route path="/:moodId" element={<MoodPage playlistList={playlistList} gradients={gradients} token={spotifyToken} addTrackToPlaylist={addTrackToPlaylist} />} />
            <Route path="/playlist/:playlistId" element={<PlaylistPage playlistList={playlistList} gradients={gradients} deletePlaylist={deletePlaylist} handleDeleteSongs={handleDeleteSongs} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/create" element={<AddPlaylistPage playlistList={playlistList} callbackToCreate={addPlaylist} />} />
          </Routes>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default App
