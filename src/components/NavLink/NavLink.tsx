import clsx from "clsx";
import Link from "next/link";

interface NavLinkProps {
  toggleMenu?: () => void;
  status?: string;
}

export const NavLink = ({ toggleMenu, status }: NavLinkProps) => {
  return (
    <nav
      className="flex flex-col gap-10 items-center
      md:flex-row "
    >
      <Link
        href="/"
        className="text-3xl/8 font-medium md:text-base/5 md:font-normal relative group"
        onClick={toggleMenu}
      >
        Home
        <span
          className={clsx(
            "absolute inset-x-0 bottom-0 w-0 h-0.5 bg-transparent transition-all duration-300 group-hover:w-full",
            {
              "group-hover:bg-orange": status === "themaA",
              "group-hover:bg-darkGreen": status === "themaB",
              "group-hover:bg-darkBlue": status === "themaC",
              "group-hover:bg-rose": status === "themaD",
              "group-hover:bg-peach": status === "themaF",
            }
          )}
        ></span>
      </Link>
      <Link
        href="/teachers"
        className="text-3xl/8 font-medium md:text-base/5 md:font-normal relative group"
        onClick={toggleMenu}
      >
        Teachers
        <span
          className={clsx(
            "absolute inset-x-0 bottom-0 w-0 h-0.5 bg-transparent transition-all duration-300 group-hover:w-full",
            {
              "group-hover:bg-orange": status === "themaA",
              "group-hover:bg-darkGreen": status === "themaB",
              "group-hover:bg-darkBlue": status === "themaC",
              "group-hover:bg-rose": status === "themaD",
              "group-hover:bg-peach": status === "themaF",
            }
          )}
        ></span>
      </Link>
    </nav>
  );
};
