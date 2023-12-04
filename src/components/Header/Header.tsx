"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Logo } from "../Logo/Logo";
import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { HeaderSkeleton } from "../HeaderSkeleton/HeaderSkeleton";
import { UserBar } from "../UserBar/UserBar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

interface HeaderProps {
  status: string;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const [showOnMobile, setShowOnMobile] = useState(false);
  const [showOnTablet, setShowOnTable] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });

    setShowOnMobile(isMobile);
    setShowOnTable(isTablet);
  }, [isMobile, isTablet]);

  return (
    <header className="flex relative items-center p-4 md:justify-around">
      {isLoading ? (
        <HeaderSkeleton status={status} />
      ) : (
        <>
          <Logo variant="header" />
          {showOnTablet && (
            <>
              <NavLink status={status} />
              {isLoggedIn ? (
                <UserBar userName={userName} />
              ) : (
                <Auth status={status} />
              )}
            </>
          )}
          {showOnMobile && <BurgerMenu status={status} />}
        </>
      )}
    </header>
  );
};

export default Header;
