
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MoodPage.module.scss";

export default function MoodPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // If location.state is null, navigate back to HomePage
  if (!location.state || !location.state.details) {
    // Optionally, you can show an error message instead of navigating
    navigate('/');
    return null;
  }

  const { details } = location.state;

  return (
    <div className={styles.MoodPage}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>{details.title}</h1>
        </div>
      </div>
    </div>
  );
}
