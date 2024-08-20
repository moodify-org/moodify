import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.scss';

export default function NavBar() {
    const navigate = useNavigate();

    const handleRandomClick = () => {
        const moodId = Math.floor(Math.random() * 5) + 1; 
        navigate(`/${moodId}`);
    };

    return (
        <div className={styles.NavBar}>
            <div><Link to="/"><h1>Moodify</h1></Link></div>
            <div className={styles.navOptions}>
                <Link to="*"><h2>Playlist</h2></Link>
                <button onClick={handleRandomClick}><h2>Random</h2></button>
                <Link to="/about"><h2>About</h2></Link>
            </div>
        </div>
    );
}