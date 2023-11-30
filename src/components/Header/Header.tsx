"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSearchParams } from "next/navigation";

import { Logo } from "../Logo/Logo";
import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";

interface HeaderProps {
  status: string;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const searchParams = useSearchParams();
  const show = searchParams?.get("show");
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const [showOnMobile, setShowOnMobile] = useState(false);
  const [showOnTablet, setShowOnTable] = useState(false);

  useEffect(() => {
    setShowOnMobile(isMobile);
    setShowOnTable(isTablet);
  }, [isMobile, isTablet]);

  return (
    <header className="flex relative items-center p-4 md:justify-around ">
      <Logo />
      {showOnTablet && (
        <>
          <NavLink />
          <Auth />
        </>
      )}
      {showOnMobile && <BurgerMenu />}
    </header>
  );
};

export default Header;
