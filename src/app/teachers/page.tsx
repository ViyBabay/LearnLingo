import { TeacherFilterForm } from "@/components/TeacherFilterForm/TeacherFilterForm";
import { getTeachers } from "@/services/api";

interface Teacher {
  languages: string[];
  levels: string[];
  price_per_hour: number;
}

const TeachersPage = async () => {
  const teachersData = await getTeachers();

  const getUniqueValues = (data, key) => {
    const allValues = data.flatMap((teacher) => teacher[key]);
    console.log(`allValues:`, allValues);

    return [...new Set(allValues)].sort();
  };

  const uniqueLanguages = getUniqueValues(teachersData, "languages");
  const uniqueLevels = getUniqueValues(teachersData, "levels");
  const uniquePrices = getUniqueValues(teachersData, "price_per_hour");

  return (
    <TeacherFilterForm
      languages={uniqueLanguages}
      levels={uniqueLevels}
      prices={uniquePrices}
    />
  );
};

export default TeachersPage;
