import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MoodPage.module.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MoodPage({ moodList, token }) {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const [moodDetails, setMoodDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (moodList) {
      const mood = moodList.find((m) => m.id === parseInt(moodId));
      if (mood) {
        setMoodDetails(mood);
      } else {
        navigate('/');
      }
    }
  }, [moodId, moodList, navigate]);

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

            // not more than 10 track
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

  if (error) {
    return <div>{error}</div>;
  }

  if (!moodDetails) {
    return <div>No mood details found</div>;
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>{moodDetails.title}</h1>
        </div>
        <div>
          <div>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map(track => (
                  <li key={track.id}>
                    {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    <div>
                      <audio controls src={track.preview_url}>
                        Your browser does not support the audio element.
                      </audio>
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
