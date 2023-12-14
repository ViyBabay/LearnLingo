import { logout } from "@/services/api";
import clsx from "clsx";
import { FiLogOut } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

interface UserBarProps {
  handleClick: (path: string) => void;
  userName: string | null;
  status: string;
}

export const UserBar = ({ userName, status, handleClick }: UserBarProps) => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:gap-x-4 gap-y-10">
      <button
        type="button"
        onClick={() => handleClick("logout")}
        className="flex gap-2 items-center text-[26px] font-extrabold md:font-bold md:text-base/5 hover:scale-110 transition-all duration-300"
      >
        <FiLogOut
          size={30}
          className={clsx("md:w-5 md:h-5", {
            "stroke-orange": status === "themaA",
            "stroke-darkGreen": status === "themaB",
            "stroke-darkBlue": status === "themaC",
            "stroke-rose": status === "themaD",
            "stroke-peach": status === "themaF",
          })}
        />
        Log out
      </button>
      <p className="p-[12px] rounded-xl bg-dark text-white font-extrabold md:font-bold md:text-base/5">
        Hello, {userName}!
      </p>
    </div>
  );
};
