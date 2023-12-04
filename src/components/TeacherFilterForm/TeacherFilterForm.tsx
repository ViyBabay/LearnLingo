import { FC } from "react";
import { SelectInput } from "../SelectInput/SelectInput";

interface TeacherFilterFormProps {
  [key: string]: string[];
}

export const TeacherFilterForm: FC<TeacherFilterFormProps> = ({
  languages,
  levels,
  prices,
}) => {
  return (
    <form className="flex flex-col w-max m-auto md:flex-row md:gap-5 md:m-0">
      <SelectInput label="Languages" options={languages} />
      <SelectInput label="Level of knowledge" options={levels} />
      <SelectInput label="Price" options={prices.map((price) => `${price}`)} />
    </form>
  );
};
