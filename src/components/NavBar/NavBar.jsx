import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.scss';

export default function NavBar() {
  const navigate = useNavigate();

  const getRandomMoodId = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className={styles.NavBar}>
      <div><Link to="/"><h1>Moodify</h1></Link></div>
      <div className={styles.navOptions}>
        <Link to="/create"><h2>Create Playlist</h2></Link>
        <Link to={`/${getRandomMoodId()}`}><h2>Random</h2></Link>
        <Link to="/about"><h2>About</h2></Link>
      </div>
    </div>
  );
}
