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
  const [menu, setMenu] = useState<boolean>(false);
  const handleMenuToggle = () => {
      setMenu(prevMenu => !prevMenu);
  };

  const menuClass = menu ? "translate-x-0" : "-translate-x-110";

  return (
    <>
    <div className={`${styles.header} relative flex items-center justify-between p-4`}>
        <div className="flex items-center gap-x-4">
            <div className={styles.burgerMenu}>
                <BurgerMenu onClick={handleMenuToggle} expanded={menu} />
            </div>
            <Logo />
        </div>
        <SearchBar className="hidden md:block w-[300px]" onSearch={onSearch} />
        <SideBar onClick={handleMenuToggle} menu={menuClass} />
        <Auth />
    </div>
      <SearchBar className="w-[calc(100%_-_40px)] md:hidden mx-auto mb-8" onSearch={onSearch} />
    </>
  )
}
