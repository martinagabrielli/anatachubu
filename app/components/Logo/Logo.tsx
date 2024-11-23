import styles from './logo.module.scss';

export default function Logo() {
  return (
    <div className={`${styles.logo} flex items-center`}>
        <img src="/assets/anatachubu.svg" alt="Anatachubu Logo" />
        <h3 className="medium">AnataChubu</h3>
    </div>
  )
}
