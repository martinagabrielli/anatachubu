import styles from './banner.module.scss';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <h3 className={styles.banner__heading}>Welcome to Anatachubu!</h3>
      <p className="body-1 grey-1">Please login to get started.</p>
    </div>
  )
}
