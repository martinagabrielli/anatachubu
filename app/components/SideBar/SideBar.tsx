import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Logo from "../Logo/Logo";

interface SideBarProps {
    onClick: () => void;
    menu: boolean;
}

export default function SideBar({onClick, menu}: SideBarProps) {
    return ( 
        <div className={`sidebar absolute top-0 transition-all ease-in ${menu}`}>
            <div className="bg-white relative z-100 border-2 border-gray-300 rounded-lg p-4 h-screen w-100">
                <div className="flex flex-col h-16 w-full">
                    <div className="flex justify-between w-full">
                        <BurgerMenu onClick={onClick} />
                        <Logo />
                    </div>
                    <div className="flex flex-col justify-start mt-5 px-4">
                        <ul className="d-flex space-y-2">
                            <li>Menu item 1</li>
                            <li>Menu item 2</li>
                            <li>Menu item 3</li>
                            <li>Menu item 4</li>
                            <li>Menu item 5</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
