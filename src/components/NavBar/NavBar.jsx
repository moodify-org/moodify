import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss"

export default function NavBar () {
    return (
        <div className={styles.NavBar}>
            <div><Link to="/"><h1>Moodify</h1></Link></div>
            <div className={styles.navOptions}>
                <Link to="*"><h2>Playlist</h2></Link>
                <Link to="*"><h2>Random</h2></Link>
                <Link to="/about"><h2>About</h2></Link>
            </div>
        </div>
    )
}