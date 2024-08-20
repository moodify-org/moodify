import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MoodPage.module.scss";
import { useEffect, useState } from 'react';

export default function MoodPage({ moodList }) {
  const { moodId } = useParams();
  const navigate = useNavigate();
  const [moodDetails, setMoodDetails] = useState(null);

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

  if (moodList === null) {
    return <div>Loading...</div>; 
  }

  if (!moodDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.MoodPage}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>{moodDetails.title}</h1>
        </div>
      </div>
    </div>
  );
}