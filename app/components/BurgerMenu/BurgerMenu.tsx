import styles from './burgermenu.module.scss';

export default function BurgerMenu({onClick, expanded}: { onClick: () => void, expanded: boolean }) {
  return (
    <button onClick={onClick} className={styles.burgerMenu} aria-label="Toggle menu" aria-expanded={expanded}>
        <span></span>
        <span></span>
        <span></span>
    </button>
  )
}
