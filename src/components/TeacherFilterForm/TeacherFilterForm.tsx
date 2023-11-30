import { SelectInput } from "../SelectInput/SelectInput";

export const TeacherFilterForm = ({ languages, levels, prices }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <SelectInput label="Languages" options={languages} />
      <SelectInput label="Levels" options={levels} />
      <SelectInput label="Price Per Hour" options={prices} />
    </form>
  );
};
