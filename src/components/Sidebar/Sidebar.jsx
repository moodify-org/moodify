import styles from "./Sidebar.module.scss"
import { Link, NavLink, useParams } from "react-router-dom";
import AddPlaylistPage from "../../pages/AddPlaylist/AddPlaylistPage"

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
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/1">Sad</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/2">Chill</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/3">Angry</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/4">Happy</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/5">Empowered</NavLink>
            </li>
            <li>
              <NavLink style={({ isActive }) => {
                return {
                  color: isActive ? "#ffffff" : "",
                };
              }} to="/6">Nature</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.playlist}>
          <h1>Playlists</h1>
          <ul className={styles.menu}>
            {playlistList.length === 6 && <Link to="/create" element={<AddPlaylistPage />} className={styles.noPlaylist}>Create a playlist!</Link>}
            {playlistList.length > 6 && playlistList.slice(6).map((playlist) => (
              <li key={playlist.id}>
                <NavLink
                  style={({ isActive }) => ({
                    color: isActive ? "#ffffff" : "",
                  })}
                  to={`/playlist/${playlist.id}`} 
                >
                  {playlist.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
