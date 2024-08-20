import { useNavigate } from 'react-router-dom';
import MoodCard from "../../components/MoodCard/MoodCard";
import styles from "./HomePage.module.scss";

export default function HomePage({ playlistList }) {
  const navigate = useNavigate();

  // Define a list of gradients
  const gradients = [
    "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)"
  ];

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
        {playlistList && playlistList.map((mood, index) => (
          <div
            className={styles.homeMood}
            key={mood.id}
            onClick={() => handleMoodClick(mood)}
          >
            <MoodCard
              details={mood}
              id={mood.id}
              gradient={gradients[index % gradients.length]} // Assign a gradient based on index
            />
          </div>
        ))}
      </div>
    </div>
  );
}
