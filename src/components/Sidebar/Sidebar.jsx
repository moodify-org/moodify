import styles from "./Sidebar.module.scss"
import { NavLink, useParams } from "react-router-dom";

export default function Sidebar({ gradients, playlistList, colorNum }) {
  const { moodId } = useParams();
  return (
    <div className={styles.sidebar} style={{ backgroundImage: moodId < 7 ? gradients[moodId - 1] : gradients[colorNum] }}>
      <nav>
        <div className={styles.moods}>
          <h1>Moods</h1>
          <ul className={styles.menu}>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/1">Sad</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/2">Chill</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/3">Angry</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/4">Happy</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/5">Empowered</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#000000" : "",
                };
              }} to="/6">Nature</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.playlist}>
          <h1>Playlists</h1>
          {playlistList && playlistList.slice(6).map((playlist, index) => {
            return (
              <ul className={styles.menu}>
                <li>
                  <NavLink style={({ isActive }) => {
                    return {
                      color: isActive ? "#000000" : "",
                    };
                  }} to={`/playlist/${index + 1}`}>{playlist.title}</NavLink>
                </li>
              </ul>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
