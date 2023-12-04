import Image from "next/image";
import { PiBookOpenLight, PiStarFill } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { TeacherAvatar } from "../TeacherAvatar/TeacherAvatar";

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface TeacherProps {
  item: {
    name: string;
    surname: string;
    languages: string[];
    levels: string[];
    rating: number;
    reviews: Review[];
    price_per_hour: number;
    lessons_done: number;
    avatar_url: string;
    lesson_info: string;
    conditions: string[];
    experience: string;
  };
}

export const TeacherItem = async ({ item }: TeacherProps) => {
  return (
    <li className="relative flex flex-wrap md:flex-nowrap items-start md:gap-x-8  p-5 md:p-6 rounded-3xl bg-white">
      <TeacherAvatar
        name={item.name}
        surname={item.surname}
        avatarUrl={item.avatar_url}
      />

      <div className="w-full">
        <div className="flex flex-col xl:flex-row  xl:w-full items-center md:items-start justify-center xl:justify-between gap-1 xl:gap-8 mb-8 xl:mb-2 xl:pr-[85px]">
          <p className="text-greyLabel font-medium leading-6">Languages</p>
          <div className="flex items-center flex-wrap ">
            <ul className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center md:justify-start font-medium leading-6">
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <PiBookOpenLight size={16} className="mr-2" />
                <p>Lessons online</p>
              </li>
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <p>Lessons done: {item.lessons_done}</p>
              </li>
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <PiStarFill size={16} className="fill-goldStar mr-2" />
                <p>Rating: {item.rating}</p>
              </li>
              <li>
                <p>
                  Price / 1 hour:{" "}
                  <span className="text-green">{item.price_per_hour} $</span>
                </p>
              </li>
            </ul>
            <button
              type="button"
              className="absolute top-5 right-5 cursor-pointer"
            >
              <CiHeart size={26} />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-grow flex-wrap ">
          <p className="mb-5 xl:mb-8 text-2xl font-medium leading-[1]">
            {item.name} {item.surname}
          </p>
          <p className="mb-2 font-medium leading-6 ">
            <span className="text-greyLabel font-medium leading-6">
              Speaks:{" "}
            </span>
            <span className="underline"> {item.languages.join(", ")}</span>
          </p>
          <p className="mb-2 font-medium leading-6">
            <span className="text-greyLabel font-medium leading-6">
              Lesson info:{" "}
            </span>
            {item.lesson_info}
          </p>
          <p className="mb-4 font-medium leading-6">
            <span className="text-greyLabel font-medium leading-6">
              Conditions:{" "}
            </span>
            {item.conditions}
          </p>
          <details className=" mb-8 w-max">
            <summary className="list-none underline cursor-pointer font-medium leading-6">
              Read more
            </summary>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </details>
          <ul className="flex flex-wrap items-center gap-2 xl:gap-x-2 font-medium leading-6">
            {item.levels.map((level: string, index: number) => (
              <li
                key={index}
                className="py-2 px-3 rounded-[35px] border-[1px] border-lightGrey"
              >
                <p>#{level}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};
