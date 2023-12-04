'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

interface SelectInputProps {
  label: string;
  options: string[];
}

export const SelectInput: FC<SelectInputProps> = ({ label, options }) => {
  const queryParams = label.split(' ')[0].toLowerCase();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const selectedValue = searchParams.get(queryParams) || '';

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParams, value);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col w-max gap-y-2 ">
      <label className="text-greyLabel text-sm leading-[18px] font-medium ">{label}</label>
      <select
        className="py-2 px-[18px] text-[18px] leading-[1.1] font-medium focus:outline-none focus:shadow-outline rounded-[14px]"
        name={queryParams}
        value={selectedValue}
        onChange={handleStatusChange}
      >
        <option className="text-[18px] leading-[1.1] font-medium" value="" disabled>
          ----
        </option>
        {options.map(option => (
          <option
            className="text-foxDark  text-[18px] leading-[1.1] font-medium"
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
