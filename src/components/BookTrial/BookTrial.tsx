import { BookForm } from "../BookForm/BookForm";
import { BookTrialHead } from "../BookTrialHead/BookTrialHead";

interface TeacherAvatarProps {
  name: string;
  surname: string;
  avatarUrl: string;
}

export const BookTrial = ({ name, avatarUrl, surname }: TeacherAvatarProps) => {
  return (
    <div className="flex flex-col gap-10 md:p-6">
      <BookTrialHead name={name} avatarUrl={avatarUrl} surname={surname} />
      <BookForm />
    </div>
  );
};
