import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-auto">
      <RxHamburgerMenu size={30} onClick={toggleMenu} />
      {isOpen && (
        <div className="absolute top-[50px] left-0 z-40 min-h-screen min-w-full border-2 bg-white">
          <div className="flex flex-col gap-4 items-center mt-40 ">
            <NavLink toggleMenu={toggleMenu} />
            <Auth />
          </div>
        </div>
      )}
    </div>
  );
};
