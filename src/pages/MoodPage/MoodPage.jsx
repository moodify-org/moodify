import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MoodPage.module.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MoodPage({ playlistList, token, gradients, addTrackToPlaylist }) {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const [moodDetails, setMoodDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');

  useEffect(() => {
    if (playlistList) {
      const mood = playlistList.find((m) => m.id === parseInt(moodId));
      if (mood) {
        setMoodDetails(mood);
      } else {
        navigate('/');
      }
    }
  }, [moodId, playlistList, navigate]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (moodDetails && token) {
        try {
          let tracksWithPreview = [];
          let attempts = 0;
          const maxAttempts = 5;

          while (tracksWithPreview.length < 10 && attempts < maxAttempts) {
            const response = await axios.get('https://api.spotify.com/v1/recommendations', {
              params: {
                limit: 20,
                market: 'GB',
                seed_genres: moodDetails.genre[0]
              },
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const fetchedTracks = response.data.tracks.filter(track => track.preview_url);
            tracksWithPreview = [...tracksWithPreview, ...fetchedTracks];

            if (tracksWithPreview.length > 10) {
              tracksWithPreview = tracksWithPreview.slice(0, 10);
            }

            attempts++;
          }

          if (tracksWithPreview.length === 0) {
            setError('No tracks with previews available');
          } else {
            setRecommendations(tracksWithPreview);
          }
        } catch (error) {
          setError('Error fetching recommendations');
        }
      }
    };

    fetchRecommendations();
  }, [moodDetails, token]);

  const handleAddTrack = (playlistId, track) => {
    if (playlistId && track) {
      addTrackToPlaylist(parseInt(playlistId), track);
      setSelectedPlaylistId('');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!moodDetails) {
    return <div>No mood details found</div>;
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar gradients={gradients} playlistList={playlistList} />
      <div className={styles.main}>
        <div className={styles.header} style={{ backgroundImage: gradients ? gradients[moodId - 1] : 'none' }}>
          <h1>{moodDetails.title}</h1>
        </div>
        <div className={styles.track} >
          <div>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map(track => (
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
                      <select
                        className={styles.addButton}
                        style={{ backgroundImage: gradients ? gradients[moodId - 1] : 'none' }}
                        value={selectedPlaylistId}
                        onChange={(e) => {
                          setSelectedPlaylistId(e.target.value);
                          handleAddTrack(e.target.value, track);
                        }}
                      >
                        <option value="" disabled>Add to</option>
                        {playlistList && playlistList.slice(6).map((playlist) => (
                          <option key={playlist.id} value={playlist.id}>
                            {playlist.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No recommendations with previews available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
