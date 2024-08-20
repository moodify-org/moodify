
import { useNavigate } from 'react-router-dom';
import MoodCard from "../../components/MoodCard/MoodCard";
import styles from "./HomePage.module.scss";

export default function HomePage({ playlistList }) {
  const navigate = useNavigate();

  const handleMoodClick = (mood) => {
    navigate(`/${mood.id}`, { state: { details: mood } });
  };

  return (
    <div className={styles.HomePage}>
      <div className={styles.homeHeader}>
        <h1>WHAT'S YOUR MOOD?</h1>
      </div>
      <div className={styles.homeText}>
        <h1>Select the playlist you want to feel!</h1>
      </div>
      <div className={styles.homeMoods}>
        {playlistList && playlistList.map((mood) => (
          <div
            className={styles.homeMood}
            key={mood.id}
            onClick={() => handleMoodClick(mood)}
          >
            <MoodCard details={mood} id={mood.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
