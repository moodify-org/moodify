import styles from "./AboutPage.module.scss"

export default function AboutPage() {
    return (
        <div className={styles.AboutPage}>
            <div className={styles.aboutInfo}>
                <h1>What is Moodify?</h1>
                <h3>Moodify is an easy-to-use application where you can select the mood you are feeling and songs will be automatically recommended to you. You are also able to create personalised playlists with these available songs to specify a particular vibe you are looking for!</h3>
            </div>
            <div className={styles.aboutCreators}>
                <h1>Who made Moodify?</h1>
                <div className={styles.aboutCreatorsDiv}>
                    <div className={styles.aboutJose}> 
                        <h3>Jose</h3>
                    </div>
                    <div className={styles.aboutMael}> 
                        <h3>Mael</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}