"use client";

import { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import Logo from "./Logo/Logo";
import { NavLink } from "./NavLink/NavLink";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const [showOnMobile, setShowOnMobile] = useState(false);
  const [showOnTablet, setShowOnTable] = useState(false);

  useEffect(() => {
    setShowOnMobile(isMobile);
    setShowOnTable(isTablet);
  }, [isMobile, isTablet]);

  return (
    <div className="flex">
      <Logo />
      {showOnTablet && <NavLink />}
      {showOnMobile && <BurgerMenu />}
    </div>
  );
};

export default Header;

// const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

// use hideOnMobile in your render!
