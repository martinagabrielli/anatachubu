import Auth from "../Auth/Auth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={`${styles.header} flex items-center justify-between p-4`}>
        <div className="flex items-center">
            <div className={styles.burgerMenu}>
                <BurgerMenu /> 
            </div>
            <Logo />
        </div>
        <SearchBar />
        <Auth />
    </div>
  )
}
