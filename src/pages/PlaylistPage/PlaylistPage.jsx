import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "../MoodPage/MoodPage.module.scss";
import { useEffect, useState } from 'react';

export default function PlaylistPage({ playlistList, gradients }) {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [randomColorNum, setRandomColorNum] = useState(0);

  useEffect(() => {
    if (playlistList) {
      const playlist = playlistList.find((m) => m.id === parseInt(playlistId) + 6);
      if (playlist) {
        setPlaylistDetails(playlist);
        setRandomColorNum(Math.floor(((Math.random() * 5) + 1)))
      } else {
        navigate('/');
      }
    }
  }, [playlistId, playlistList, navigate]);


  if (!playlistDetails) {
    return <div>No mood details found</div>;
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar gradients={gradients} playlistList={playlistList} colorNum={randomColorNum} />
      <div className={styles.main}>
        <div className={styles.header} style={{ backgroundImage: gradients ? gradients[randomColorNum] : 'none' }}>
          <h1>{playlistDetails.title}</h1>
        </div>
        <div>
          <div>
            <ul>
              {playlistList[playlistId + 5].songs.map(track => (
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
                      className={`${styles.audioPlayer} ${styles[`gradient-${moodId}`]}`}
                      src={track.preview_url}
                    ></audio>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
