import Link from "next/link";
import Image from "next/image";
import HeaderLogo from "../../../../../public/HeaderLogo/HeaderLogo.svg";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2">
      <Image src={HeaderLogo} alt="header logo" />
      <p className="text-xl/[1.2] font-medium">LearnLingo</p>
    </Link>
  );
};

export default Logo;
