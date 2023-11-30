interface StatusProps {
  status: string;
}

export const Statistics = ({ status }: StatusProps) => {
  return (
    <div className="block-1 flex items-start">
      <div className="flex justify-center items-start gap-4">
        <div className="32_000__ text-[#121417] font-['Roboto'] text-[1.75rem] font-medium leading-8">
          32,000 +
        </div>
        <div className="experienced_tutors w-24 text-[#121417]/[.70] font-['Roboto'] text-sm leading-[1.125rem]">
          Experienced tutors
        </div>
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="300_000__ text-[#121417] font-['Roboto'] text-[1.75rem] font-medium leading-8">
          300,000 +
        </div>
        <div className="5-star_tutor_reviews w-24 text-[#121417]/[.70] font-['Roboto'] text-sm leading-[1.125rem]">
          5-star tutor reviews
        </div>
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="120__ text-[#121417] font-['Roboto'] text-[1.75rem] font-medium leading-8">
          120 +
        </div>
        <div className="subjects_taught w-[4.625rem] text-[#121417]/[.70] font-['Roboto'] text-sm leading-[1.125rem]">
          Subjects taught
        </div>
      </div>
      <div className="flex justify-center items-start gap-4">
        <div className="200__ text-[#121417] font-['Roboto'] text-[1.75rem] font-medium leading-8">
          200 +
        </div>
        <div className="tutor_nationalities w-[4.625rem] text-[#121417]/[.70] font-['Roboto'] text-sm leading-[1.125rem]">
          Tutor nationalities
        </div>
      </div>
    </div>
  );
};
