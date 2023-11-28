import Link from "next/link";

export const NavLink = () => {
  return (
    <div className="flex gap-7">
      <Link href={"/"} className="text-base/5 font-normal">
        Home
      </Link>
      <Link href={"/teachers"} className="text-base/5 font-normal">
        Teachers
      </Link>
    </div>
  );
};


