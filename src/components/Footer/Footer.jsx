import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <a href="https://github.com/moodify-org/moodify" target='_blank'>
        <i className="fa-brands fa-github"></i><span></span></a>
    </div>
  )
}
