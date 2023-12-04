import clsx from "clsx";
import { RxHamburgerMenu } from "react-icons/rx";

import { Logo } from "../Logo/Logo";
import { NavLink } from "../NavLink/NavLink";

interface HeaderSkeletonProps {
  status?: string;
}

export const HeaderSkeleton = ({ status }: HeaderSkeletonProps) => {
  return (
    <div className="flex items-center justify-between md:justify-around w-full">
      <Logo variant="skeleton" status={status} />
      <RxHamburgerMenu size={30} className="md:hidden" />
      <div className="hidden w-2/5 md:flex md:items-center md:justify-between">
        <NavLink />
        <span
          className={clsx(
            "block w-28 h-8 rounded-xl opacity-[0.15] bg-greyLabel",
            {
              "bg-orange": status === "themaA",
              "bg-darkGreen": status === "themaB",
              "bg-darkBlue": status === "themaC",
              "bg-rose": status === "themaD",
              "bg-peach": status === "themaF",
            }
          )}
        ></span>
      </div>
    </div>
  );
};
