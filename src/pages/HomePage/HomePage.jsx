
import MoodCard from "../../components/MoodCard/MoodCard"
import styles from "./HomePage.module.scss"

export default function HomePage () {
    return (
        <div className={styles.HomePage}>
            <div className={styles.homeHeader}>
                <h1>WHAT'S YOUR MOOD?</h1>
            </div>
            <div className={styles.homeText}><h1>Select the playlist you want to feel!</h1></div>
            <div className={styles.homeMoods}>
                <MoodCard />
                <MoodCard />
                <MoodCard />
                <MoodCard />
                <MoodCard />
                <MoodCard />
            </div>
        </div>
    )
}