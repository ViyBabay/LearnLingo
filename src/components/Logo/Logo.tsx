import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import HeaderLogo from "../../../public/images/header/logo.svg";

interface LogoProps {
  variant: string;
  status?: string;
}

export const Logo = ({ variant, status }: LogoProps) => {
  return (
    <Link href="/" className="flex gap-2 items-center">
      {variant === "header" ? (
        <Image src={HeaderLogo} alt="header logo" width={28} height={28} />
      ) : (
        <span
          className={clsx(
            "block w-7 h-7 rounded-full opacity-[0.15] bg-greyLabel",
            {
              "bg-orange": status === "themaA",
              "bg-darkGreen": status === "themaB",
              "bg-darkBlue": status === "themaC",
              "bg-rose": status === "themaD",
              "bg-peach": status === "themaF",
            }
          )}
        ></span>
      )}
      <p className="text-xl/[1.2] font-medium">LearnLingo</p>
    </Link>
  );
};
