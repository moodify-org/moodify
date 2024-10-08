import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../MoodPage/MoodPage.module.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlaylistPage({ playlistList, gradients, deletePlaylist, handleDeleteSongs }) {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [randomColorNum, setRandomColorNum] = useState(0);

  useEffect(() => {
    if (playlistList) {
      const playlist = playlistList.find((m) => m.id === parseInt(playlistId));
      if (playlist) {
        setPlaylistDetails(playlist);
        setRandomColorNum(Math.floor(Math.random() * gradients.length));
      } else {
        navigate('/');
      }
    }
  }, [playlistId, playlistList, navigate]);

  if (!playlistDetails) {
    return <div>No playlist details found</div>;
  }

  const handleDelete = () => {
    deletePlaylist(playlistDetails.id);
    navigate('/');
  };

  const delSongs = () => {
    handleDeleteSongs(playlistDetails.songs);
    navigate('/');
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar gradients={gradients} playlistList={playlistList} colorNum={randomColorNum} />
      <div className={styles.main}>
        <div className={styles.header} style={{ backgroundImage: gradients ? gradients[randomColorNum] : 'none' }}>
          <h1>{playlistDetails.title}</h1>
          <p className={styles.playlistDescription}>{playlistDetails.description}</p> {/* Ajout d'une classe pour le style de la description */}
          <button onClick={handleDelete} className={styles.delButton}>X</button>
        </div>
        <div>
          <ul>
            {playlistDetails.songs.map(track => (
              <li key={track.id} className={styles.trackItem}>
                <div className={styles.audioPlayerContainer}>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className={styles.trackImage}
                  />
                  <div className={styles.trackInfo}>
                    <span className={styles.trackTitle}>{track.name}</span>
                    <span className={styles.trackArtists}>
                      {track.artists.map(artist => artist.name).join(', ')}
                    </span>
                  </div>
                  <audio
                    controls
                    className={`${styles.audioPlayer} ${styles[`gradient-${randomColorNum + 1}`]}`}
                    src={track.preview_url}
                  ></audio>
                  <button
                    onClick={() => handleDeleteSongs(playlistDetails.id, track.id)}
                    className={styles.delSongs}
                    style={{ backgroundImage: gradients ? gradients[randomColorNum] : 'none' }}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
