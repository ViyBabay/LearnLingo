import clsx from "clsx";
import Header from "@/components/Header/Header";
import { TeacherFilterForm } from "@/components/TeacherFilterForm/TeacherFilterForm";
import { TeachersList } from "@/components/TeachersList/TeachersList";

import {
  getAllTeachersForFilters,
  getTeachers,
  getTeachersData,
} from "@/services/api";
import { statuses } from "@/utils/themaApi";

const TeachersPage = async ({
  searchParams,
}: {
  searchParams?: {
    languages?: string;
    level?: string;
    price?: string;
    page?: string;
  };
}) => {
  const teachersData = await getTeachers();
  const filterDataArray = await getAllTeachersForFilters();

  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  const languages = searchParams?.languages || "";
  const levels = searchParams?.level || "";
  const price = searchParams?.price || "";
  const page = searchParams?.page || "";
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getTeachersData(searchParams);

  // console.log("this is data log :", data);

  return (
    <>
      <Header status={status} />
      <main
        className={clsx(
          "flex min-h-screen max-w-[1440px] mx-auto flex-col items-center px-5",
          {
            "bg-lightOrange": status === "themaA",
            "bg-lightGreen": status === "themaB",
            "bg-lightBlue": status === "themaC",
            "bg-lightRose": status === "themaD",
            "bg-lightPeach": status === "themaF",
          }
        )}
      >
        <section className="py-6 px-4 xl:px-[108px] w-full">
          <TeacherFilterForm
            languages={filterDataArray.uniqueLanguages}
            levels={filterDataArray.uniqueLevels}
            prices={filterDataArray.uniquePrices}
          />
          <TeachersList />
        </section>
      </main>
    </>
  );
};

export default TeachersPage;
