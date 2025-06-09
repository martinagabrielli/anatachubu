import Link from "next/link";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";

interface SideBarProps {
    onClick: () => void;
    menu: boolean;
}

export default function SideBar({onClick, menu}: SideBarProps) {
    return ( 
        <div className={`sidebar z-100 absolute top-0 transition-all ease-in ${menu}`}>
            <div className="bg-background relative z-100 border-2 border-gray-300 rounded-lg p-4 h-screen w-100">
                <div className="flex flex-col h-16 w-full">
                    <div className="flex justify-between w-full">
                        <BurgerMenu onClick={onClick} />
                        <Logo />
                    </div>
                    <div className="flex flex-col justify-start mt-10 px-4">
                        <ul className="flex flex-col space-y-2 body-1">
                            <Link href="/">Home</Link>
                            <Link href="/favourites">Favourites</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
