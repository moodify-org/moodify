import styles from "./Sidebar.module.scss"
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink  style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} className={styles.active} to="/Mood1">Mood 1</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood2">Mood 2</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood3">Mood 3</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood4">Mood 4</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood5">Mood 5</NavLink>
          </li>
          <li>
            <NavLink style={({ isActive}) => {
              return {
                color: isActive ? "#00bfff" : "",
              };
            }} to="/Mood6">Mood 6</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
