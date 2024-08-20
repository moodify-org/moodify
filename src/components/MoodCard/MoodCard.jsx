import { useState } from "react";
import styles from "./MoodCard.module.scss";
import { Link } from 'react-router-dom';

export default function MoodCard({ details, id, gradient }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to={`/${id}`}>
      <div
        className={`${styles.item} ${isHovered ? styles.hovered : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage: gradient }} // Apply the gradient background
      >
        {isHovered ? details.description : details.title}
      </div>
    </Link>
  );
}
