import Auth from "../Auth/Auth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import styles from './header.module.scss';
import { useState } from "react";
import SideBar from "../SideBar/SideBar";
interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({onSearch}: HeaderProps) {
  const [menu, setMenu] = useState<Boolean>(false);
  const handleMenuToggle = () => {
      setMenu(prevMenu => !prevMenu);
  };

  const menuClass = menu ? "translate-x-0" : "-translate-x-110";

  return (
    <div className={`${styles.header} relative flex items-center justify-between p-4`}>
        <div className="flex items-center">
            <div className={styles.burgerMenu}>
                <BurgerMenu onClick={handleMenuToggle} />
            </div>
            <Logo />
        </div>
        <SearchBar onSearch={onSearch} />
        <SideBar onClick={handleMenuToggle} menu={menuClass} />
        <Auth />
    </div>
  )
}
