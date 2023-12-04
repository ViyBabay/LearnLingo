import React from "react";
import { TeacherItem } from "../TeacherItem/TeacherItem";
import { getTeachers } from "@/services/api";

export const TeachersList = async () => {
  const teachersData = await getTeachers();

  return (
    <ul className="flex flex-col gap-y-8 mt-8">
      {teachersData.map((item) => (
        <TeacherItem key={item.avatar_url} item={item} />
      ))}
    </ul>
  );
};
