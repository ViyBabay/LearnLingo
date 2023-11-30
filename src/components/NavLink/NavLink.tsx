import Link from "next/link";

interface NavLinkProps {
  toggleMenu?: () => void;
}

export const NavLink = ({ toggleMenu }: NavLinkProps) => {
  return (
    <nav
      className="flex flex-col gap-7 items-center
      md:flex-row "
    >
      <Link href={"/"} className="text-base/5 font-normal" onClick={toggleMenu}>
        Home
      </Link>
      <Link
        href={"/teachers"}
        className="text-base/5 font-normal"
        onClick={toggleMenu}
      >
        Teachers
      </Link>
    </nav>
  );
};
