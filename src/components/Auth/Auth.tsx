import clsx from "clsx";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface AuthProps {
  toggleMenu?: () => void;
  status: string;
}

export const Auth = ({ status, toggleMenu }: AuthProps) => {
  const router = useRouter();

  const handleNavClick = (path: string) => {
    if (toggleMenu) toggleMenu();
    router.push(`/?${path}=true`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-4 ">
      <button
        onClick={() => handleNavClick("login")}
        className="flex gap-2 items-center text-[26px] font-extrabold md:font-bold md:text-base/5"
      >
        <FiLogIn
          size={30}
          className={clsx("md:w-5 md:h-5", {
            "stroke-orange": status === "themaA",
            "stroke-darkGreen": status === "themaB",
            "stroke-darkBlue": status === "themaC",
            "stroke-rose": status === "themaD",
            "stroke-peach": status === "themaF",
          })}
        />
        Log in
      </button>
      <button
        onClick={() => handleNavClick("registration")}
        className="w-48 h-14 md:w-40 md:h-10 rounded-xl bg-dark text-white text-2xl font-extrabold md:font-bold md:text-base/5"
      >
        Registration
      </button>
    </div>
  );
};
