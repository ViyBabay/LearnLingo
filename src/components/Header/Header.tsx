"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Logo } from "../Logo/Logo";
import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

interface HeaderProps {
  status: string;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const [showOnMobile, setShowOnMobile] = useState(false);
  const [showOnTablet, setShowOnTable] = useState(false);

  useEffect(() => {
    setShowOnMobile(isMobile);
    setShowOnTable(isTablet);
  }, [isMobile, isTablet]);

  return (
    <header className="flex relative items-center p-4 md:justify-around">
      <Logo />
      {showOnTablet && (
        <>
          <NavLink status={status} />
          <Auth status={status} />
        </>
      )}
      {showOnMobile && <BurgerMenu status={status} />}
    </header>
  );
};

export default Header;
