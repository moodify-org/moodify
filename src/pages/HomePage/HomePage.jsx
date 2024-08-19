import { useEffect, useState } from 'react'
import axios from 'axios'

import MoodCard from "../../components/MoodCard/MoodCard"
import styles from "./HomePage.module.scss"

export default function HomePage () {
    const [moodList, setMoodList] = useState()

    useEffect(() => {
      axios
        .get("https://json-moodify.adaptable.app/playlists")
        .then(({data}) => setMoodList(data))
        .catch(e => console.log(e))
    }, [])
  
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