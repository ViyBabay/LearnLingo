import { FiLogIn } from "react-icons/fi";

export const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-x-4 md:flex-row md: gap-4">
      <button className="flex gap-2 items-center font-bold text-base/5">
        <FiLogIn />
        Log in
      </button>
      <button className="w-40 h-10 rounded-xl bg-dark text-white font-bold text-base/5">
        Registration
      </button>
    </div>
  );
};
