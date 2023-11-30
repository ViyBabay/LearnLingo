import Link from "next/link";
import Image from "next/image";
import HeaderLogo from "../../../public/images/header/logo.svg";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-2 items-center ">
      <Image src={HeaderLogo} alt="header logo" />
      <p className="text-xl/[1.2] font-medium">LearnLingo</p>
    </Link>
  );
};
