"use client";

import clsx from "clsx";
import { useSearchParams } from "next/navigation";

interface TeachersLevelsListProps {
  levels: {};
}

export const TeachersLevelsList = ({ levels }: TeachersLevelsListProps) => {
  const searchParams = useSearchParams();
  const languageLevels = searchParams.get("level");

  return (
    <ul className="flex flex-wrap items-center gap-2 xl:gap-x-2 font-medium leading-6">
      {Object.keys(levels).map((level: string, index: number) => (
        <li
          key={index}
          className={clsx(
            "py-2 px-3 rounded-[35px] border-[1px] border-lightGrey",
            {
              "bg-orange border-transparent": languageLevels === level,
            }
          )}
        >
          <p>#{level}</p>
        </li>
      ))}
    </ul>
  );
};
