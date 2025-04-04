import styles from './burgermenu.module.scss';

export default function BurgerMenu({onClick}: { onClick: () => void }) {
  return (
    <div onClick={onClick} className={styles.burgerMenu}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
