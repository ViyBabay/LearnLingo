"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactSelect from "react-select";
import { FC } from "react";
import { getSelectStyles } from "@/utils/getSelectStyles";

interface SelectInputProps {
  label: string;
  options: string[];
  width: string;
}

export const SelectInput: FC<SelectInputProps> = ({
  label,
  options,
  width,
}) => {
  const queryParams = label.split(" ")[0].toLowerCase();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedValue = searchParams.get(queryParams) || "";

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : "";
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParams, value);

    replace(`${pathname}?${params.toString()}`);
  };

  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectStyles = getSelectStyles({ width });

  return (
    <div className="flex flex-col w-max gap-y-2 ">
      <label className="text-greyLabel text-sm leading-[18px] font-medium ">
        {label}
      </label>
      <ReactSelect
        styles={selectStyles}
        options={selectOptions}
        onChange={handleChange}
        value={selectOptions.find((option) => option.value === selectedValue)}
        placeholder="-------"
      />
    </div>
  );
};
