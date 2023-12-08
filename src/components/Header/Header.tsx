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
import Modal from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const showLogin = searchParams.get("login");
  const showRegistration = searchParams.get("registration");
  const showLogout = searchParams.get("logout");

  console.log("Consol showLogin:", showLogin);

  console.log("Consol showRegistration:", showRegistration);

  const handleClick = (path: string) => {
    router.push(`${pathName}/?${path}=true`);
  };

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
    <>
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
                  <UserBar
                    handleClick={handleClick}
                    userName={userName}
                    status={status}
                  />
                ) : (
                  <Auth handleClick={handleClick} status={status} />
                )}
              </>
            )}
            {showOnMobile && (
              <BurgerMenu handleNavClick={handleClick} status={status} />
            )}
          </>
        )}
      </header>
      {showLogin && (
        <Modal>
          <LoginForm />
        </Modal>
      )}
      {showRegistration && (
        <Modal>
          <RegisterForm />
        </Modal>
      )}
      {showLogout && <LogoutModal status={status} />}
    </>
  );
};

export default Header;
