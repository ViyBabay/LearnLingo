import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";
import { UserBar } from "../UserBar/UserBar";
import { auth } from "@/firebase/config";

interface BurgerProps {
  status: string;
  handleNavClick: (path: string) => void;
}

export const BurgerMenu = ({ status, handleNavClick }: BurgerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = (path: string) => {
    if (toggleMenu) toggleMenu();
    handleNavClick(path);
  };

  return (
    <div className="ml-auto">
      <RxHamburgerMenu size={30} onClick={toggleMenu} />
      {isOpen && (
        <div className="absolute top-[50px] left-0 z-40 min-h-screen min-w-full border-2 bg-white">
          <div className="flex flex-col gap-32 items-center mt-40 ">
            <NavLink toggleMenu={toggleMenu} />
            {isLoggedIn ? (
              <UserBar
                handleClick={handleClick}
                userName={userName}
                status={status}
              />
            ) : (
              <Auth handleClick={handleClick} status={status} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
