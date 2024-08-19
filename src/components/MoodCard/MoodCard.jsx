import { useState } from "react"
import styles from "./MoodCard.module.scss"

export default function MoodCard() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`${styles.item} ${isHovered ? styles.hovered : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered ? "Hello!" : "Hover over me"}
        </div>
    )
}