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
    if (moodDetails && token) {
      const fetchRecommendations = async () => {
        try {
          const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            params: {
              limit: 10,
              market: 'GB',
              seed_genres: moodDetails.genre[0]
            },
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setRecommendations(response.data.tracks);
        } catch (error) {
          setError('Error fetching recommendations');
        }
      };
      fetchRecommendations();
    }
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
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map(track => (
                <li key={track.id}>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</li>
              ))}
            </ul>
          ) : (
            <div>No recommendations available</div>
          )}
        </div>
      </div>
    </div>
  );
}
