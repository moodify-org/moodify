import { useState } from "react"
import styles from "./MoodCard.module.scss"
import MoodPage from "../../pages/MoodPage/MoodPage";
import { Link } from 'react-router-dom';

export default function MoodCard() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to="/MoodPage" element={<MoodPage />}>
      <div
        className={`${styles.item} ${isHovered ? styles.hovered : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? "Hello!" : "Hover over me"}
      </div>
    </Link>

  )
}
