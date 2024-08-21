import styles from "./Sidebar.module.scss"
import { NavLink, useParams } from "react-router-dom";

export default function Sidebar({ gradients, playlistList }) {
  const { moodId } = useParams();
  return (
    <div className={styles.sidebar} style={{ backgroundImage: gradients ? gradients[moodId - 1] : 'none' }}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} className={styles.active} to="/Mood1">Sad</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood2">Chill</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood3">Angry</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood4">Happy</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood5">Empowered</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood6">Nature</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
